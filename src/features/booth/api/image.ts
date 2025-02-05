import { publicClient } from "@/src/shared/api/client";

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);

  return publicClient
    .post("images", {
      body: formData,
    })
    .json();
};
