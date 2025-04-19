"use client";

import { Button } from "@/src/shared/ui/button";
import { Label } from "@/src/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/shared/ui/radio-group";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Link from "next/link";
import { useState } from "react";
import { BoothCategory } from "@/src/shared/lib/types";
import { useRouter } from "next/navigation";
import { useCreateBooth } from "@/src/features/booth/api";
import useBoothDetailsDraftStore from "@/src/shared/model/store/booth-details-draft-store";

export function SelectMode() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [parent] = useAutoAnimate();
  const router = useRouter();
  const { mutateAsync: createBooth } = useCreateBooth();

  return (
    <>
      <div className="space-y-24">
        <div>
          <h2 className="mb-1 mt-[33px] text-[1.375rem] font-semibold text-black">
            어떤 방식으로 <br />
            생성할까요?
          </h2>
          <p className=" text-xs font-normal text-[#AAA]">
            언제든지 편집을 통해 내용을 상세히 수정할 수 있습니다.
          </p>
        </div>
        <RadioGroup
          className="grid gap-3"
          value={selectedOption}
          onValueChange={setSelectedOption}
        >
          <RadioGroupItem
            className="sr-only"
            value="overview"
            id="overview"
            checked={selectedOption === "overview"}
          />
          <Label
            htmlFor="overview"
            className={`flex w-full cursor-pointer flex-col items-start rounded-xl border border-[#d5d5d5] bg-white pb-7 pl-4 pt-4 hover:bg-white ${selectedOption === "overview" ? "border-pink even:text-pink" : ""}`}
          >
            <div className="text-lg font-bold text-black">
              간단하게 생성하기
            </div>
            <div
              className={`text-sm font-medium text-[#3d3d3d] ${selectedOption === "overview" ? "text-pink" : ""}`}
            >
              필수적인 정보만 입력하여 부스를 등록합니다.
            </div>
          </Label>
          <RadioGroupItem
            className="sr-only"
            value="details"
            id="details"
            checked={selectedOption === "details"}
          />
          <Label
            htmlFor="details"
            className={`flex w-full cursor-pointer flex-col items-start rounded-xl border border-[#d5d5d5] bg-white pb-7 pl-4 pt-4 hover:bg-white ${selectedOption === "details" ? "border-pink" : ""}`}
          >
            <div className=" text-lg font-bold text-black">상세히 생성하기</div>
            <div
              className={`text-sm font-medium text-[#3d3d3d] ${selectedOption === "details" ? "text-pink" : ""}`}
            >
              모든 정보를 직접 입력할 수 있습니다.
            </div>
          </Label>
        </RadioGroup>
      </div>
      <div
        className="sticky bottom-0 mt-auto flex w-full bg-white pb-4 pt-4"
        ref={parent}
      >
        {selectedOption === "overview" && (
          <Button
            className="w-full rounded-[10px] bg-pink py-3 text-white hover:bg-pink"
            asChild
          >
            <Link href="/add-booth/set-position">선택완료</Link>
          </Button>
        )}

        {/* FIXME skip making api call when the server updates APIs */}
        {selectedOption === "details" && (
          <Button
            className="w-full rounded-[10px] bg-pink py-3 text-white hover:bg-pink"
            type="button"
            onClick={async () => {
              const id = await createBooth({
                name: "이름",
                category: BoothCategory.BAR,
                description: "",
                thumbnail: "",
                warning: "",
                detail: "",
                festivalId: 2,
                location: "위치를 설정해주세요",
                latitude: 0,
                longitude: 0,
                menus: [],
                boothSchedules: [],
              });
              router.push(`/add-booth/details/set-position/${id}`);
            }}
          >
            선택완료
          </Button>
        )}
      </div>
    </>
  );
}
