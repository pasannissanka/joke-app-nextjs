import axios from "axios";
import {
  ILoginRequest,
  ILoginResponse,
  IResponse,
  ISubmittedJoke,
} from "../types/types";
import { SessionData } from "../lib/session";

export const loginModerator = async ({ username, password }: ILoginRequest) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const response = await axios.post<SessionData>(`${baseUrl}/api/auth`, {
    username,
    password,
  });

  const data = response.data;
  return data;
};

export const fetchPendingJokes = async ({
  limit,
  page,
}: {
  page: number;
  limit: number;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_MODERATE_API_URL;
  const response = await axios.get<IResponse<ISubmittedJoke[]>>(
    `${baseUrl}/v1/moderation/pending-jokes?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );

  const data = response.data;
  return data;
};

export const acceptJoke = async (jokeId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_MODERATE_API_URL;
  const response = await axios.post<IResponse<boolean>>(
    `${baseUrl}/v1/moderation/pending-jokes/${jokeId}/accept`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );

  const data = response.data;
  return data;
};

export const rejectJoke = async (jokeId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_MODERATE_API_URL;
  const response = await axios.post<IResponse<boolean>>(
    `${baseUrl}/v1/moderation/pending-jokes/${jokeId}/reject`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );

  const data = response.data;
  return data;
};
