import { API_URL, HTTPHeaderKey } from "@/src/shared/api/config";
import { University } from "@/src/widgets/sign-up/lib/sign-up-schema";
import { HttpMethods } from "msw";

interface AuthDetails {
  email: string;
  password: string;
  schoolId: number;
  university: string;
  contact: string;
}

export const signUp = async (authDetails: AuthDetails) => {
  const response = await fetch(`${API_URL}/members`, {
    method: HttpMethods.POST,
    headers: {
      ["content-type"]: "application/json",
    },
    // TODO change schoolId based on university
    body: JSON.stringify({
      ...authDetails,
      schoolId: 1,
      phoneNum: authDetails.contact,
    }),
  });
  const data = response.json();
  return data;
};

export const restoreAccessToken = async (refreshToken: string) => {
  const response = await fetch(`${API_URL}/reissue`, {
    headers: {
      [`${HTTPHeaderKey.REFRESH_TOKEN}`]: refreshToken,
    },
  });
  return response;
};
