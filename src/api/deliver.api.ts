import axios from "axios";
import { IJoke, IResponse } from "../types/types";

export const fetchRandomJoke = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_DELIVER_API_URL;
  const response = await axios.get<IResponse<IJoke>>(
    `${baseUrl}/v1/jokes/random`
  );

  const data = response.data;
  return data;
};

export const fetchJokes = async ({
  limit,
  page,
}: {
  page: number;
  limit: number;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_DELIVER_API_URL;
  const response = await axios.get<IResponse<IJoke[]>>(
    `${baseUrl}/v1/jokes?page=${page}&limit=${limit}`
  );

  const data = response.data;
  return data;
};
