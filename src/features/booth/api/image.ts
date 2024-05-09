import {
  API_URL,
  HTTPHeaderKey,
  HTTPHeaderValue,
  HTTPMethod,
} from "@/src/shared/api/config";

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(`${API_URL}/images`, {
    method: HTTPMethod.POST,
    body: formData,
  });
  const data = response.json();
  return data;
};
