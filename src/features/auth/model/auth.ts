import { publicClient } from "@/src/shared/api/client";
import { API_URL, HTTPHeaderKey } from "@/src/shared/api/config";
import { University } from "@/src/widgets/sign-up/lib/sign-up-schema";
import { ApiResponse } from "@/src/shared/api/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

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
      // case University.Konkuk:
      //   return 1;
        // case University.Transportation:
      //   return 3;
      // case University.Korea:
      //   return 4;
      // case University.SangMyung:
      //   return 5;
      case University.Gacheon:

        if(process.env.NODE_ENV === 'production' ){
          return 6;
        }else{
          return 1;
        }


      default:
        throw new Error("올바르지 않은 요청입니다");
    }
  };
  return publicClient
    .post("members", {
      json: { ...body, schoolId: id() }, // TODO change schoolId based on university
    })
    .json<ApiResponse<void>>();
};

export const useSignUp = (options?: UseMutationOptions<ApiResponse<void>, Error, AuthDetails>) => {
  return useMutation({
    mutationFn: signUp,
    ...options
  });
}


export const restoreAccessToken = async (refreshToken: string) => {
  const response = await fetch(`${API_URL}/reissue`, {
    headers: {
      [`${HTTPHeaderKey.REFRESH_TOKEN}`]: refreshToken,
    },
  });
  return response;
};
