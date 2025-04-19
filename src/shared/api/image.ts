import { publicClient } from "./client";

export const uploadImage = async (image: File): Promise<{ imgUrl: string }> => {
  const formData = new FormData();
  formData.append("file", image);

  return publicClient
    .post("images", {
      body: formData,
    })
    .json<{ imgUrl: string }>();
};
