import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";
import { QueueGroup } from "@/src/shared/lib/types";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export interface PinRequest {
  boothId: number;
}

export interface QueueGroupAction {
  waitingId: number;
}

const getGroups = async (boothId: number): Promise<QueueGroup[]> => {
  const { data } = await client
    .get(`waiting/${boothId}/all`)
    .json<ApiResponse<QueueGroup[]>>();
  return data;
};

const getPIN = async (boothId: number): Promise<ApiResponse<string>> => {
  return client.get(`waiting/pin/${boothId}`).json<ApiResponse<string>>();
};

const reissuePIN = async (boothId: number): Promise<ApiResponse<string>> => {
  return client.post(`waiting/pin/${boothId}`).json<ApiResponse<string>>();
};

const cancelGroup = async (waitingId: number): Promise<ApiResponse<void>> => {
  return client.put(`waiting/${waitingId}/noshow`).json<ApiResponse<void>>();
};

const callGroup = async (waitingId: number): Promise<ApiResponse<void>> => {
  return client.put(`waiting/${waitingId}/call`).json<ApiResponse<void>>();
};

const completeGroup = async (waitingId: number): Promise<ApiResponse<void>> => {
  return client.put(`waiting/${waitingId}/complete`).json<ApiResponse<void>>();
};

const queueKeys = createQueryKeys("queue", {
  list: (boothId: number) => [boothId],
  detail: (waitingId: number) => [waitingId],
  pin: (boothId: number) => [boothId],
});

export const useQueueGroupsQuery = (
  boothId: number,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: queueKeys.list(boothId).queryKey,
    queryFn: () => getGroups(boothId),
    refetchInterval: 5000,
  });
};

export const useGetPinQuery = (boothId: number) => {
  return useQuery({
    queryKey: queueKeys.pin(boothId).queryKey,
    queryFn: () => getPIN(boothId),
  });
};

export const useReissuePINMutation = (boothId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => reissuePIN(boothId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queueKeys.list(boothId).queryKey,
      });
    },
  });
};

export const useCancelGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ waitingId }: QueueGroupAction) => cancelGroup(waitingId),
    onSuccess: (_, { waitingId }) => {
      queryClient.invalidateQueries({
        queryKey: queueKeys.detail(waitingId).queryKey,
      });
    },
  });
};

export const useCallGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ waitingId }: QueueGroupAction) => callGroup(waitingId),
    onSuccess: (_, { waitingId }) => {
      queryClient.invalidateQueries({
        queryKey: queueKeys.detail(waitingId).queryKey,
      });
    },
  });
};

export const useCompleteGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ waitingId }: QueueGroupAction) => completeGroup(waitingId),
    onSuccess: (_, { waitingId }) => {
      queryClient.invalidateQueries({
        queryKey: queueKeys.detail(waitingId).queryKey,
      });
    },
  });
};
