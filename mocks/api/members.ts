import { API_URL } from "@/src/shared/api/config";
import { HttpResponse, http } from "msw";
import { member } from "./constants/members";

const memberHandler = [
  http.get(`${API_URL}/members/my`, () => {
    return HttpResponse.json({
      code: "200",
      message: "OK",
      data: { ...member },
    });
  }),
];

export default memberHandler;
