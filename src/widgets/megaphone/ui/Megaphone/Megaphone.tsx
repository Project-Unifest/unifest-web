"use client";

import { BoothItem } from "@/src/entities/booth";
import {
  BoothDetail,
  getBoothDetail,
} from "@/src/entities/booth/api/boothDetail";
import { DeleteButton } from "@/src/features/booth/ui/DeleteButton";
import { EditButton } from "@/src/features/booth/ui/EditButton";
import { BoothAvailabilitySwitchButton } from "@/src/features/booth/ui/BoothAvailabilitySwitchButton";
import { makeMegaphone } from "@/src/features/megaphone/api/megaphone";
import { Booth } from "@/src/shared/lib/types";
import useRequireAuth, {
  AuthType,
} from "@/src/shared/model/auth/useRequireAuth";
import { useAuthStore } from "@/src/shared/model/provider/auth-store-provider";
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

export function Megaphone({ boothId }: { boothId: number }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [booth, setBooth] = useState<BoothDetail>();
  const isAuthLoading = useRequireAuth(AuthType.MEMBER);

  useEffect(() => {
    const getBoothListEffect = async () => {
      const { data } = await getBoothDetail(boothId);
      if (data) {
        setBooth(data);
      }
    };
    if (!isAuthLoading) {
      getBoothListEffect();
    }
  }, [isAuthLoading, setBooth]);

  const form = useForm<{ msgBody: string }>({
    defaultValues: {
      msgBody: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log(data);
    console.log(boothId);
    const { data: megaphoneResult } = await makeMegaphone(boothId, data);
    router.push("/");
  };

  if (isAuthLoading) {
    return (
      <div className="justify-content flex items-center"> 로딩중입니다.</div>
    );
  }

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
          >
            발송하기
          </Button>
        </form>
      </Form>
    </div>
  );
}
