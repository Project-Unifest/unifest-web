"use client";

import { BoothItem } from "@/src/entities/booth";
import { BoothDetailResponse } from "@/src/entities/booth/api/boothDetail";
import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";
import { DeleteButton } from "@/src/features/booth/ui/DeleteButton";
import { EditButton } from "@/src/features/booth/ui/EditButton";
import { BoothAvailabilitySwitchButton } from "@/src/features/booth/ui/BoothAvailabilitySwitchButton";
import { useMakeMegaphoneMutation } from "@/src/features/megaphone/api";
import { Button } from "@/src/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/shared/ui/form";
import { Textarea } from "@/src/shared/ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Define the getBoothDetail function as it doesn't seem to be exported from the imported file
const getBoothDetail = async (
  boothId: number,
): Promise<ApiResponse<BoothDetailResponse>> => {
  return client
    .get(`api/booths/${boothId}`)
    .json<ApiResponse<BoothDetailResponse>>();
};

export function Megaphone({ boothId }: { boothId: number }) {
  const [booth, setBooth] = useState<BoothDetailResponse>();
  const { mutateAsync: makeMegaphone, isPending } = useMakeMegaphoneMutation();

  useEffect(() => {
    const getBoothListEffect = async () => {
      const { data } = await getBoothDetail(boothId);
      if (data) {
        setBooth(data);
      }
    };
    getBoothListEffect();
  }, [setBooth, boothId]);

  const form = useForm<{ msgBody: string }>({
    defaultValues: {
      msgBody: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: { msgBody: string }) => {
    console.log(data);
    console.log(boothId);
    await makeMegaphone({ boothId, msgBody: data.msgBody });
    router.push("/");
  };

  if (!booth) {
    return (
      <div className="flex flex-auto flex-col items-center justify-center">
        <h2 className="text-lg font-semibold">해당하는 부스 존재하지 않음</h2>
      </div>
    );
  }

  return (
    <div className="my-4 space-y-2">
      <BoothItem
        key={booth.id}
        editButton={<EditButton boothId={booth.id!} />}
        deleteButton={<DeleteButton boothId={booth.id!} />}
        switchButton={
          <BoothAvailabilitySwitchButton
            boothId={booth.id!}
            initialOpened={booth.enabled}
          />
        }
        {...booth}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="msgBody"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>보낼 내용</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="내용을 입력해주세요"
                    {...field}
                    className="h-[300px] resize-none"
                    maxLength={1000}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="mt-[16px] w-full flex-[2] rounded-[10px] bg-pink py-3 text-white hover:bg-pink"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "발송 중..." : "발송하기"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
