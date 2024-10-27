import { API_URL } from "@/src/shared/api/config";
import { QueueGroup } from "@/src/shared/lib/types";
import { http, HttpResponse } from "msw";
import { groups } from "./constants/groups";
import { booths } from "./constants/booths";
import { wrapResponse } from "./lib/response";

const getReservedGroups = (groups: Map<number, QueueGroup>) => {
  const reservedKey = { reserved: true };
  const unreservedKey = { reserved: false };

  const groupsByReservation = Map.groupBy(groups, ([_, { status }]) =>
    status === "RESERVED" ? reservedKey : unreservedKey,
  );
  return new Map(groupsByReservation.get(reservedKey));
};

const allBooths = new Map(booths.map((booth) => [booth.id, booth]));
const allGroups = new Map(groups.map((group) => [group.waitingId, group]));

export const TEST_QUEUE_GROUP_USER_CANCELS = 123;
export const TEST_THRESHOLD = 1;

const queueHandler = [
  http.get(`${API_URL}/waiting/:boothId/all`, ({ params }) => {
    const boothId = parseInt(params.boothId as string);

    if (boothId === 0) {
      return HttpResponse.json(
        wrapResponse(2000, "OK", Array.from(allGroups.values())),
      );
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

let countRequest = 0;

export const queueUserCancelsHandler = [
  http.get(`${API_URL}/waiting/:boothId/all`, ({ params }) => {
    countRequest++;
    const boothId = parseInt(params.boothId as string);

    if (boothId === 0) {
      if (countRequest > TEST_THRESHOLD) {
        return HttpResponse.json(
          wrapResponse(
            2000,
            "OK",
            Array.from(allGroups.values()).filter(
              (group) => group.waitingId !== TEST_QUEUE_GROUP_USER_CANCELS,
            ),
          ),
        );
      }
      return HttpResponse.json(
        wrapResponse(2000, "OK", Array.from(allGroups.values())),
      );
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

    if (id === TEST_QUEUE_GROUP_USER_CANCELS) {
      return new HttpResponse("Not found", {
        status: 404,
      });
    }

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

    if (id === TEST_QUEUE_GROUP_USER_CANCELS) {
      return new HttpResponse("Not found", {
        status: 404,
      });
    }

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

export const queueUserCancelsBeforeAdminHandler = [
  http.get(`${API_URL}/waiting/:boothId/all`, ({ params }) => {
    countRequest++;
    const boothId = parseInt(params.boothId as string);

    if (boothId === 0) {
      if (countRequest > TEST_THRESHOLD) {
        return HttpResponse.json(
          wrapResponse(
            2000,
            "OK",
            Array.from(allGroups.values()).filter(
              (group) => group.waitingId !== TEST_QUEUE_GROUP_USER_CANCELS,
            ),
          ),
        );
      }
      return HttpResponse.json(
        wrapResponse(2000, "OK", Array.from(allGroups.values())),
      );
    }

    if (boothId === 1) {
      return HttpResponse.json([]);
    }

    return new HttpResponse("Not found", {
      status: 404,
    });
  }),
  http.put(`${API_URL}/waiting/:id/call`, ({ params }) => {
    const id = parseInt(params.id as string);

    if (id === TEST_QUEUE_GROUP_USER_CANCELS) {
      return new HttpResponse("Not found", {
        status: 404,
      });
    }

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

    if (id === TEST_QUEUE_GROUP_USER_CANCELS) {
      return new HttpResponse("Not found", {
        status: 404,
      });
    }

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
