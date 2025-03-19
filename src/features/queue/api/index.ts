import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";
import { QueueGroup } from "@/src/shared/lib/types";

export interface PinRequest {
  boothId: number;
}

export interface QueueGroupAction {
  waitingId: string;
}

const fetchGroups = async (boothId: string): Promise<QueueGroup[]> => {
  const { data } = await client
    .get(`waiting/${boothId}/all`)
    .json<ApiResponse<QueueGroup[]>>();
  return data;
};

const fetchPIN = async (boothId: number): Promise<ApiResponse<string>> => {
  return client.get(`waiting/pin/${boothId}`).json<ApiResponse<string>>();
};

const reissuePIN = async (boothId: number): Promise<ApiResponse<string>> => {
  return client.post(`waiting/pin/${boothId}`).json<ApiResponse<string>>();
};

const cancelGroup = async (waitingId: string): Promise<ApiResponse<void>> => {
  return client.put(`waiting/${waitingId}/noshow`).json<ApiResponse<void>>();
};

const callGroup = async (waitingId: string): Promise<ApiResponse<void>> => {
  return client.put(`waiting/${waitingId}/call`).json<ApiResponse<void>>();
};

const completeGroup = async (waitingId: string): Promise<ApiResponse<void>> => {
  return client.put(`waiting/${waitingId}/complete`).json<ApiResponse<void>>();
};

export const useQueueGroupsQuery = (
  boothId: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["queue", "groups", boothId],
    queryFn: () => fetchGroups(boothId),
    // refetchInterval: 5000,
    enabled,
  });
};

export const useFetchPINQuery = (boothId: number) => {
  return useQuery({
    queryKey: ["queue", "pin", boothId],
    queryFn: () => fetchPIN(boothId),
  });
};

export const useReissuePINMutation = () => {
  return useMutation({
    mutationFn: ({ boothId }: PinRequest) => reissuePIN(boothId),
  });
};

export const useCancelGroupMutation = () => {
  return useMutation({
    mutationFn: ({ waitingId }: QueueGroupAction) => cancelGroup(waitingId),
  });
};

export const useCallGroupMutation = () => {
  return useMutation({
    mutationFn: ({ waitingId }: QueueGroupAction) => callGroup(waitingId),
  });
};

export const useCompleteGroupMutation = () => {
  return useMutation({
    mutationFn: ({ waitingId }: QueueGroupAction) => completeGroup(waitingId),
  });
};

export {
  fetchGroups,
  fetchPIN,
  reissuePIN,
  cancelGroup,
  callGroup,
  completeGroup,
};
