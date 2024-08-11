import axios from "axios";
import {
  ILoginRequest,
  ILoginResponse,
  IResponse,
  ISubmittedJoke,
} from "../types/types";

export const loginModerator = async ({ username, password }: ILoginRequest) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const response = await axios.post<IResponse<ILoginResponse>>(
    `${baseUrl}/api/auth`,
    {
      username,
      password,
    }
  );

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
    `${baseUrl}/v1/moderation/pending-jokes?page=${page}&limit=${limit}`
  );

  const data = response.data;
  return data;
};

export const acceptJoke = async (jokeId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_MODERATE_API_URL;
  const response = await axios.post<IResponse<boolean>>(
    `${baseUrl}/v1/moderation/pending-jokes/${jokeId}/accept`
  );

  const data = response.data;
  return data;
};

export const rejectJoke = async (jokeId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_MODERATE_API_URL;
  const response = await axios.post<IResponse<boolean>>(
    `${baseUrl}/v1/moderation/pending-jokes/${jokeId}/reject`
  );

  const data = response.data;
  return data;
};
