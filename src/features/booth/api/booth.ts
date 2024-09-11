import {
  API_URL,
  HTTPHeaderKey,
  HTTPHeaderValue,
  HTTPMethod,
  getAuthorziationValue,
} from "@/src/shared/api/config";
import { Booth } from "@/src/shared/lib/types";

export const deleteBooth = async (accessToken: string, id: string) => {
  const response = await fetch(`${API_URL}/api/booths/${id}`, {
    method: HTTPMethod.DELETE,
    headers: {
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
  });
  const data = await response.json();
  return data;
};

export const editBooth = async (
  accessToken: string,
  booth: Omit<Booth, "enabled" | "menus" | "detail" | "description">,
) => {
  const { id, ...boothWithoutId } = booth;
  const response = await fetch(`${API_URL}/api/booths/${id}`, {
    method: HTTPMethod.PATCH,
    headers: {
      [`${HTTPHeaderKey.CONTENT_TYPE}`]: HTTPHeaderValue.APPLICATION_JSON,
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
    body: JSON.stringify(boothWithoutId),
  });
  const data = await response.json();
  return data;
};

export const updateBoothOpened = async (
  accessToken: string,
  boothId: number,
  opened: boolean,
  latitude: number,
  longitude: number,
) => {
  const response = await fetch(`${API_URL}/api/booths/${boothId}`, {
    method: HTTPMethod.PATCH,
    headers: {
      [`${HTTPHeaderKey.CONTENT_TYPE}`]: HTTPHeaderValue.APPLICATION_JSON,
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
    body: JSON.stringify({ enabled: opened, latitude, longitude }),
  });
  const data = await response.json();
  return data;
};
