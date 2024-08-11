import { API_URL } from "@/src/shared/api/config";
import { QueueGroup } from "@/src/shared/lib/types";
import { http, HttpResponse, PathParams } from "msw";

const groups: QueueGroup[] = [
  {
    boothId: 0,
    waitingId: 123,
    partySize: 1,
    tel: "01012345678",
    deviceId: "1sdasdg12421",
    createdAt: "20240808",
    updatedAt: "20240808",
    status: "RESERVED",
    waitingOrder: 1,
  },
  {
    boothId: 0,
    waitingId: 124,
    partySize: 2,
    tel: "01012345678",
    deviceId: "1sdasdg12421",
    createdAt: "20240808",
    updatedAt: "20240808",
    status: "CALLED",
    waitingOrder: 2,
  },
  {
    boothId: 0,
    waitingId: 125,
    partySize: 3,
    tel: "01012345678",
    deviceId: "1sdasdg12421",
    createdAt: "20240808",
    updatedAt: "20240808",
    status: "COMPLETED",
    waitingOrder: 3,
  },
  {
    boothId: 0,
    waitingId: 126,
    partySize: 4,
    tel: "01012345678",
    deviceId: "1sdasdg12421",
    createdAt: "20240808",
    updatedAt: "20240808",
    status: "CANCELED",
    waitingOrder: 4,
  },
];

const queueHandler = [
  http.get(`${API_URL}/waiting/:boothId/all`, ({ params }) => {
    const boothId = parseInt(params.boothId as string);

    if (boothId === 0) {
      return HttpResponse.json(groups);
    }

    if (boothId === 1) {
      return HttpResponse.json([]);
    }

    return new HttpResponse("Not found", {
      status: 404,
    });
  }),
  http.put(`${API_URL}/waiting/call/:id`, ({ params }) => {
    const id = parseInt(params.id as string);
    const groupToBeCalled = groups.find(({ waitingId }) => waitingId === id);

    if (groupToBeCalled) {
      return HttpResponse.json({
        code: "200",
        message: "성공",
        data: groupToBeCalled,
      });
    }

    return HttpResponse.json("Not found", {
      status: 404,
    });
  }),
  http.delete(`${API_URL}/waiting/:id`, ({ params }) => {
    const id = parseInt(params.id as string);
    const groupToBeDeleted = groups.find(({ waitingId }) => waitingId === id);

    if (groupToBeDeleted) {
      return HttpResponse.json({
        code: "200",
        message: "성공",
        data: groupToBeDeleted,
      });
    }

    return new HttpResponse("Not found", {
      status: 404,
    });
  }),
];

export default queueHandler;
