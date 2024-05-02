import { API_URL } from "@/src/shared/api/config";
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
    body: JSON.stringify({
      ...authDetails,
      schoolId: authDetails.university === "건국대학교" && 0,
      phoneNum: authDetails.contact,
    }),
  });
  const data = response.json();
  return data;
};
