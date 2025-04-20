import { publicClient } from "./client";
import { ApiResponse } from "./types";

export interface ImagesResponseDetail {
  imgUrl: string;
  imgName: string;
}
export const uploadImage = async (
  image: File,
): Promise<ApiResponse<ImagesResponseDetail>> => {
  const formData = new FormData();
  formData.append("file", image);

  return publicClient
    .post("images", {
      body: formData,
    })
    .json<ApiResponse<ImagesResponseDetail>>();
};
