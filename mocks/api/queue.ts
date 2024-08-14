import { API_URL } from "@/src/shared/api/config";
import { QueueGroup } from "@/src/shared/lib/types";
import { http, HttpResponse, PathParams } from "msw";

const getReservedGroups = (groups: Map<number, QueueGroup>) => {
  const reservedKey = { reserved: true };
  const unreservedKey = { reserved: false };

  const groupsByReservation = Map.groupBy(groups, ([_, { status }]) =>
    status === "RESERVED" ? reservedKey : unreservedKey,
  );
  return new Map(groupsByReservation.get(reservedKey));
};

const groups: QueueGroup[] = [
  {
    boothId: 0,
    waitingId: 123,
    partySize: 1,
    tel: "01012345678",
    deviceId: "1sdasdg12421",
    createdAt: "2024-08-12T16:07:36.057Z",
    updatedAt: "2024-08-12T16:07:36.057Z",
    status: "RESERVED",
    waitingOrder: 1,
  },
  {
    boothId: 0,
    waitingId: 124,
    partySize: 2,
    tel: "01012345678",
    deviceId: "1sdasdg12421",
    createdAt: "2024-08-12T16:07:36.057Z",
    updatedAt: "2024-08-12T16:07:36.057Z",
    status: "CALLED",
    waitingOrder: 2,
  },
  {
    boothId: 0,
    waitingId: 125,
    partySize: 3,
    tel: "01012345678",
    deviceId: "1sdasdg12421",
    createdAt: "2024-08-12T16:07:36.057Z",
    updatedAt: "2024-08-12T16:07:36.057Z",
    status: "COMPLETED",
    waitingOrder: 3,
  },
  {
    boothId: 0,
    waitingId: 126,
    partySize: 4,
    tel: "01012345678",
    deviceId: "1sdasdg12421",
    createdAt: "2024-08-12T16:07:36.057Z",
    updatedAt: "2024-08-12T16:07:36.057Z",
    status: "CANCELED",
    waitingOrder: 4,
  },
];

const allGroups = new Map(groups.map((group) => [group.waitingId, group]));

const queueHandler = [
  http.get(`${API_URL}/waiting/:boothId/all`, ({ params }) => {
    const boothId = parseInt(params.boothId as string);

    if (boothId === 0) {
      return HttpResponse.json(Array.from(allGroups.values()));
    }

    if (boothId === 1) {
      return HttpResponse.json([]);
    }

    return new HttpResponse("Not found", {
      status: 404,
    });
  }),
  http.get(`${API_URL}/waiting/:boothId/reserved`, ({ params }) => {
    const id = parseInt(params.id as string);
    const reservedGroups = getReservedGroups(allGroups);

    return HttpResponse.json(Array.from(reservedGroups.values()));
  }),
  http.put(`${API_URL}/waiting/:id/call`, ({ params }) => {
    const id = parseInt(params.id as string);
    const groupToBeCalled = allGroups.get(id);

    if (groupToBeCalled) {
      allGroups.set(id, { ...groupToBeCalled, status: "CALLED" });
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
  http.put(`${API_URL}/waiting/:id/complete`, ({ params }) => {
    const id = parseInt(params.id as string);
    const groupToBeCompleted = allGroups.get(id);

    if (groupToBeCompleted) {
      allGroups.set(id, { ...groupToBeCompleted, status: "COMPLETED" });
      return HttpResponse.json({});
    }

    return HttpResponse.json("Not found", {
      status: 404,
    });
  }),
  http.delete(`${API_URL}/waiting/:id`, ({ params }) => {
    const id = parseInt(params.id as string);

    const isGroupDeleted = allGroups.delete(id);

    if (isGroupDeleted) {
      return HttpResponse.json({
        code: "200",
        message: "성공",
      });
    }

    return new HttpResponse("Not found", {
      status: 404,
    });
  }),
];

export default queueHandler;
