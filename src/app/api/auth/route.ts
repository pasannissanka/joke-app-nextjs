import axios from "axios";
import { NextRequest } from "next/server";
import {
  defaultSession,
  SessionData,
  sessionOptions,
} from "../../../lib/session";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { IAuthUser, ILoginResponse, IResponse } from "../../../types/types";

const baseUrl = process.env.NEXT_PUBLIC_MODERATE_API_URL;

export async function POST(req: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  try {
    const { username, password } = await req.json();

    const res = await axios.post<IResponse<ILoginResponse>>(
      `${baseUrl}/v1/auth/login`,
      {
        username: username,
        password: password,
      }
    );

    if (res.status !== 201) {
      return Response.json(res.data, { status: res.status });
    }

    session.token = res.data.data.access_token;
    session.user = res.data.data.user;
    session.isLoggedIn = true;

    await session.save();

    return Response.json(session);
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  try {
    if (session.isLoggedIn && session.token) {
      const res = await axios.get<IResponse<IAuthUser>>(
        `${baseUrl}/v1/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );

      if (res.status !== 200) {
        session.destroy();
        return Response.json(defaultSession, { status: 401 });
      }

      session.user = res.data.data;
      await session.save();

      return Response.json(session);
    } else {
      session.destroy();
      return Response.json(defaultSession);
    }
  } catch (error) {
    session.destroy();
    return Response.json(defaultSession);
  }
}

export async function DELETE() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.destroy();

  return Response.json(defaultSession);
}
