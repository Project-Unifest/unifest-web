import { publicClient } from "@/src/shared/api/client";
import { API_URL, HTTPHeaderKey } from "@/src/shared/api/config";
import { University } from "@/src/widgets/sign-up/lib/sign-up-schema";
import { ApiResponse } from "@/src/shared/api/types";

interface AuthDetails {
  email: string;
  password: string;
  schoolId: number;
  university: string;
  contact: string;
}

interface SignUpRequest {
  email: string;
  password: string;
  schoolId: number;
  phoneNum: string;
}

export const signUp = async (
  authDetails: AuthDetails,
): Promise<ApiResponse<void>> => {
  const body: SignUpRequest = {
    email: authDetails.email,
    password: authDetails.password,
    schoolId: authDetails.schoolId,
    phoneNum: authDetails.contact,
  };
  const id = () => {
    switch (authDetails.university) {
      case University.Konkuk:
        return 1;
      case University.Transportation:
        return 3;
      case University.Korea:
        return 4;
      case University.SangMyung:
        return 5;
      default:
        throw new Error("올바르지 않은 요청입니다");
    }
  };
  console.log(id());
  return publicClient
    .post("members", {
      json: { ...body, schoolId: id() }, // TODO change schoolId based on university
    })
    .json<ApiResponse<void>>();
};

export const restoreAccessToken = async (refreshToken: string) => {
  const response = await fetch(`${API_URL}/reissue`, {
    headers: {
      [`${HTTPHeaderKey.REFRESH_TOKEN}`]: refreshToken,
    },
  });
  return response;
};
