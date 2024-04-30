import { API_URL } from "@/src/shared/api/config";
import { HttpResponse, http } from "msw";

const boothHandler = [
  http.get(`${API_URL}/api/booths`, () => {
    return HttpResponse.json({
      data: [
        {
          name: "컴공주점",
          description: "컴퓨터공학부 전공 부스",
          location: "청심대 앞",
          enabled: true,
        },
        {
          name: "전전주점",
          description: "",
          location: "청심대 앞",
          enabled: true,
        },
        {
          name: "사환공주점",
          description: "어딘가",
          location: "찾아보세요",
          enabled: false,
        },
      ],
    });
  }),
];

export default boothHandler;
