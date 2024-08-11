import { SessionOptions } from "iron-session";
import { IAuthUser } from "../types/types";

export interface SessionData {
  token: string;
  user: IAuthUser | null;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  token: "",
  user: null,
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long", // TODO - change this to a more secure password
  cookieName: "auth-session",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: false,
  },
};
