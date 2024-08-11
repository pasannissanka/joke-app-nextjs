export enum ResponseStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface IResponse<T> {
  message: string;
  status: ResponseStatus;
  data: T;
  error?: any;
}

export interface IJoke {
  id: string;
  joke: string;
  type: IJokeType;
  createdAt: Date;
}

export interface IJokeType {
  id: string;
  type: string;
  jokes: IJoke[];
  createdAt: Date;
}

export interface ISubmittedJoke {
  id: string;
  joke: string;
  joke_type_id: string;
}

export interface ISubmitJokeBody {
  joke: string;
  joke_type_id: string;
}
