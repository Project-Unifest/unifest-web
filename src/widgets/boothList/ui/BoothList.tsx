"use client";

import { BoothItem } from "@/src/entities/booth";
import { getBoothList } from "@/src/entities/booth/api/boothList";
import { AddBoothButton } from "@/src/features/booth";
import { DeleteButton } from "@/src/features/booth/ui/DeleteButton";
import { EditButton } from "@/src/features/booth/ui/EditButton";
import { SwitchButton } from "@/src/features/booth/ui/SwitchButton";
import { Member } from "@/src/shared/lib/types";
import useAuthFetch from "@/src/shared/model/auth/useAuthFetchList";
import useRequireAuth, {
  AuthType,
} from "@/src/shared/model/auth/useRequireAuth";
import { useAuthStore } from "@/src/shared/model/provider/auth-store-provider";
import { useBoothListStore } from "@/src/shared/model/provider/booth-list-store-provider";
import { useEffect } from "react";

export function BoothList() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const [booths, initializeBoothList] = useBoothListStore((state) => [
    state.booths,
    state.initialize,
  ]);

  const getAuthBooth = useAuthFetch(getBoothList);
  const isAuthLoading = useRequireAuth(AuthType.MEMBER);

  console.log(booths);

  useEffect(() => {
    const getBoothListEffect = async () => {
      const data = await getAuthBooth();

      if (data) {
        const { booths: newBooths } = data as Member;
        initializeBoothList(newBooths);
      }
    };
    if (!isAuthLoading) {
      getBoothListEffect();
    }
  }, [getAuthBooth, isAuthLoading, initializeBoothList]);

  if (isAuthLoading) {
    return (
      <div className="justify-content flex items-center"> 로딩중입니다.</div>
    );
  }

  if (!booths.length) {
    return (
      <div className="flex flex-auto flex-col items-center justify-center">
        <h2 className="text-lg font-semibold">운영중인 부스 없음</h2>
        <p className="text-xs font-medium text-gray">
          부스를 추가하고 대기 손님들을 관리하세요
        </p>
        <AddBoothButton />
      </div>
    );
  }

  return (
    <div className="my-4 space-y-2">
      {booths.map((booth) => (
        <BoothItem
          key={booth.id}
          {...booth}
          editButton={<EditButton boothId={booth.id} />}
          deleteButton={<DeleteButton boothId={booth.id} />}
          switchButton={<SwitchButton />}
        />
      ))}
    </div>
  );
}
