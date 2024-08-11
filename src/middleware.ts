import { getIronSession } from 'iron-session';
import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from './lib/session';

export async function middleware(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  console.log(session)

  if (!session.isLoggedIn || !session.token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: '/moderate/:path*',
};
