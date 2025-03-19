"use client";

import { BoothItem } from "@/src/entities/booth";
import { AddBoothButton, BoothSwitchButton } from "@/src/features/booth";
import { DeleteButton } from "@/src/features/booth/ui/DeleteButton";
import { EditButton } from "@/src/features/booth/ui/EditButton";
import Link from "next/link";
import { Button } from "@/src/shared/ui/button";
import ClockIcon from "@/src/shared/ui/ClockIcon";
import PlusIcon from "@/src/shared/ui/PlusIcon";
import { useGetMyProfile } from "@/src/entities/members/api";

export function BoothList() {
  const { data: myProfile } = useGetMyProfile();
  const booths = myProfile.booths;

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
          editButton={<EditButton boothId={booth.id!} />}
          deleteButton={<DeleteButton boothId={booth.id!} />}
          switchButton={
            <div className="flex flex-col items-end justify-start gap-2 ">
              <BoothSwitchButton
                boothId={booth.id}
                initialOpened={booth.enabled}
              />
              <Button size="queue" state="queue" shape="rounded">
                <Link
                  href={`/booths/${booth.id}`}
                  className="flex flex-row items-center justify-center gap-1"
                >
                  <ClockIcon />
                  웨이팅 관리
                </Link>
              </Button>
            </div>
          }
        />
      ))}
      <Button
        type="button"
        className="flex h-8 w-full justify-center  gap-1 rounded-xl border border-[#F5687E] bg-[#FFF0F3] text-sm font-medium text-[#F5687E]"
        asChild
      >
        <Link href="/add-booth/select-mode">
          <PlusIcon />
          부스 추가하기
        </Link>
      </Button>
    </div>
  );
}
