import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { client, publicClient } from "@/src/shared/api/client";
import { API_URL } from "@/src/shared/api/config";
import { ApiResponse } from "@/src/shared/api/types";
import { Booth, BoothCategoryKeys } from "@/src/shared/lib/types";
import { MenuStatus } from "../../menu/lib/types";
import { BoothDetailResponse } from "@/src/entities/booth/api/boothDetail";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { MemberDetailResponse, memberKeys } from "@/src/entities/members/api";

interface ProductForCreate {
  menuStatus?: MenuStatus;
  id?: number;
  name: string;
  price: number;
  imgUrl?: string;
}

interface BoothForCreate {
  id?: number;
  name: string;
  category: BoothCategoryKeys;
  description?: string;
  detail?: string;
  thumbnail: string;
  warning?: string;
  location: string;
  latitude: number;
  longitude: number;
  menus: ProductForCreate[];
  enabled?: boolean;
  festivalId: number;
  openTime: null | string;
  closeTime: null | string;
}

export interface ToggleBoothQueueRequest {
  boothId: number;
  isQueueFeatureEnabled: boolean;
}

interface MenuCreateRequest {
  name: string;
  price: number;
  imgUrl?: string;
  menuStatus: MenuStatus;
}
interface LocalTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

interface BoothScheduleResponse {
  id: number;
  date: string;
  openTime: LocalTime;
  closeTime: LocalTime;
}

interface BoothScheduleCreateRequest {
  date: string;
  openTime: LocalTime;
  closeTime: LocalTime;
}

export interface BoothCreateRequest {
  name: string;
  category: BoothCategoryKeys;
  description: string;
  detail: string;
  thumbnail: string;
  warning: string;
  festivalId: number;
  menus: MenuCreateRequest[];
  location: string;
  latitude: number;
  longitude: number;
  boothSchedules: BoothScheduleCreateRequest[];
}

interface BoothPatchRequest {
  name?: string;
  category?: BoothCategoryKeys;
  description?: string;
  detail?: string;
  thumbnail?: string;
  warning?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  enabled?: boolean;
  waitingEnabled?: boolean;
}
const FESTIVAL_ID = 2;

const getBoothList = async (): Promise<Booth[]> => {
  // FIXME: special endpoint for admin web
  const response = await fetch(`${API_URL}/api/booths`);
  const result = (await response.json()) as ApiResponse<Booth[]>;
  return result.data;
};

const getBoothDetail = async (
  boothId: number,
): Promise<BoothDetailResponse> => {
  const { booths } = (
    await client.get(`api/members/my`).json<ApiResponse<MemberDetailResponse>>()
  ).data;

  const booth = booths.find((booth) => booth.id === boothId)!;
  return booth;

  // FIXME: special endpoint for admin web
  // const response = await client
  //   .get(`api/booths/${boothId}`)
  //   .json<ApiResponse<BoothDetailResponse>>();
  // return response.data;
};

const createBooth = async (boothData: BoothCreateRequest): Promise<number> => {
  boothData.festivalId = FESTIVAL_ID;

  return (
    await client
      .post("api/booths", {
        json: boothData,
      })
      .json<ApiResponse<number>>()
  ).data;
};

const deleteBooth = async (boothId: number): Promise<ApiResponse<void>> => {
  return client.delete(`api/booths/${boothId}`).json<ApiResponse<void>>();
};

const updateBooth = async (
  id: number,
  boothData: BoothPatchRequest,
): Promise<ApiResponse<number>> => {
  return client
    .patch(`api/booths/${id}`, {
      json: boothData,
    })
    .json<ApiResponse<number>>();
};

const toggleQueue = async (
  boothId: number,
  enabled: boolean,
): Promise<ApiResponse<Booth>> => {
  return client
    .patch(`api/booths/${boothId}`, {
      json: { waitingEnabled: enabled },
    })
    .json<ApiResponse<Booth>>();
};

const uploadImage = async (image: File): Promise<{ imgUrl: string }> => {
  const formData = new FormData();
  formData.append("file", image);

  return publicClient
    .post("images", {
      body: formData,
    })
    .json<{ imgUrl: string }>();
};

export const boothKeys = createQueryKeys("booths", {
  list: null,
  detail: (params: { boothId: number }) => [params],
});

export const useBoothListQuery = () => {
  return useSuspenseQuery({
    // queryKey: boothKeys.list.queryKey,
    queryKey: memberKeys.me.queryKey,
    queryFn: getBoothList,
  });
};

export const useBoothDetailQuery = (boothId: number) => {
  return useSuspenseQuery({
    // queryKey: boothKeys.detail({ boothId }).queryKey,
    queryKey: memberKeys.me.queryKey,
    queryFn: () => getBoothDetail(boothId),
  });
};

export const useCreateBooth = (options?: { onCreate?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booth: BoothCreateRequest) => createBooth(booth),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.me.queryKey });
      queryClient.invalidateQueries({ queryKey: boothKeys.list.queryKey });
      options?.onCreate?.();
    },
  });
};

export const useDeleteBooth = (
  boothId: number,
  options: { onDelete?: () => void },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteBooth(boothId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.me.queryKey });
      queryClient.invalidateQueries({ queryKey: boothKeys.list.queryKey });
      options.onDelete?.();
    },
  });
};

export const useUpdateBooth = (
  boothId: number,
  options?: { onUpdate?: () => void },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boothData: BoothPatchRequest) =>
      updateBooth(boothId, boothData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.me.queryKey });
      queryClient.invalidateQueries({ queryKey: boothKeys.list.queryKey });
      options?.onUpdate?.();
    },
  });
};

export const useToggleQueue = (
  boothId: number,
  options: { onToggle?: () => void },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (enabled: boolean) => toggleQueue(boothId, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.me.queryKey });
      queryClient.invalidateQueries({ queryKey: boothKeys.list.queryKey });
      options.onToggle?.();
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
  });
};
