import { API_URL } from "@/src/shared/api/config";
import { http, HttpResponse } from "msw";

const helloHandler = [
  http.get(`${API_URL}/hello`, () => {
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
];

export default helloHandler;
