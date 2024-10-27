const getEnvVariable = (key: string) => {
  if (process.env[key] === undefined) {
    throw new Error(`Environment variable is undefined`);
  }
  return process.env[key];
};

class ResponseError extends Error {
  response: Response;
  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

export const handleResponse = async (response: Response): Promise<any> => {
  try {
    if (!response.ok) {
      throw new ResponseError("Invalid response", response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    switch (response.status) {
      case 400:
        break;
      case 401:
        break;
      case 404:
        break;
      case 500:
        break;
    }
  }
};

export const BASE_URL = process.env["BASE_URL"];
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";
export const PATCH = "PATCH";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export enum HTTPHeaderKey {
  CONTENT_TYPE = "content-type",
  AUTHORIZATION = "authorization",
  REFRESH_TOKEN = "Refreshtoken",
}

export enum HTTPHeaderValue {
  APPLICATION_JSON = "application/json",
  MULTI_PART_FORM = "multipart/form-data",
}

export const getAuthorziationValue = (accessToken: string) =>
  `Bearer ${accessToken}`;

export const getAccessToken = (authorization: string) => {
  return authorization.split(" ")[1];
};

export const StatusCode = {
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NoContent: 204,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
};
