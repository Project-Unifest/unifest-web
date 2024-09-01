import { API_URL } from "@/src/shared/api/config";
import { Booth } from "@/src/shared/lib/types";
import { HttpResponse, http } from "msw";
import { booths } from "./constants/booths";

const allBooths = new Map(booths.map((booth) => [booth.id, booth]));

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
  http.get(`${API_URL}/api/booths/:boothId`, ({ params }) => {
    const boothId = parseInt(params.boothId as string);

    const booth = allBooths.get(boothId);

    if (booth) {
      return HttpResponse.json({
        data: {
          ...booth,
        },
      });
    }

    return HttpResponse.json("Not found", { status: 404 });
  }),
  http.get(`${API_URL}/waiting/pin/:boothId`, ({ params }) => {
    const boothId = parseInt(params.boothId as string);

    const booth = allBooths.get(boothId);

    if (booth) {
      return HttpResponse.json({
        code: "200",
        message: "성공",
        data: "1234",
      });
    }

    return new HttpResponse("Not found", {
      status: 404,
    });
  }),
  http.post(`${API_URL}/waiting/pin/:boothId`, ({ params }) => {
    const boothId = parseInt(params.boothId as string);

    const booth = allBooths.get(boothId);

    if (booth) {
      return HttpResponse.json({
        code: "200",
        message: "성공",
        data: "5678",
      });
    }

    return new HttpResponse("Not found", {
      status: 404,
    });
  }),
];

export default boothHandler;
