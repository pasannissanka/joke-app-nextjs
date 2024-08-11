import axios from "axios";
import { IResponse, ISubmitJokeBody, ISubmittedJoke } from "../types/types";

export const submitJoke = async (body: ISubmitJokeBody) => {
  const baseUrl = process.env.NEXT_PUBLIC_SUBMIT_API_URL;
  const response = await axios.post<IResponse<ISubmittedJoke>>(
    `${baseUrl}/v1/jokes`,
    body
  );

  const data = response.data;
  return data;
}
