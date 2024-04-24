import AlcoholIcon from "@/src/shared/ui/AlcoholIcon";
import CircleEllipsisIcon from "@/src/shared/ui/CircleEllipsisIcon";
import EventIcon from "@/src/shared/ui/EventIcon";
import FoodIcon from "@/src/shared/ui/FoodIcon";
import { RadioGroup, RadioGroupItem } from "@/src/shared/ui/radio-group";
import { TextNoneIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import React from "react";

export function SetCategory() {
  return (
    <>
      <div className="flex flex-col items-center justify-start space-y-3">
        <h2 className="text-lg font-semibold">부스의 분류는 무엇인가요</h2>
        <p className="text-gray text-xs font-medium">
          이후 부스 편집을 통해 언제는 수정 가능합니다.
        </p>
      </div>
      <RadioGroup className="grid grid-cols-2 grid-rows-[173px] gap-x-[17px] gap-y-[14px]">
        <div className="border-gray flex flex-col items-center justify-center border">
          <RadioGroupItem className="" value="bar" id="bar" />
          <Label htmlFor="bar" className="flex flex-col items-center">
            <AlcoholIcon />
            주점
          </Label>
        </div>
        <div className="border-gray flex flex-col items-center  justify-center border">
          <RadioGroupItem className="" value="food" id="food" />
          <Label htmlFor="food" className="flex flex-col items-center">
            <FoodIcon />
            먹거리
          </Label>
        </div>
        <div className="border-gray flex flex-col items-center justify-center  border">
          <RadioGroupItem className="" value="event" id="event" />
          <Label htmlFor="event" className="flex flex-col items-center">
            <EventIcon />
            이벤트
          </Label>
        </div>
        <div className="border-gray flex flex-col items-center justify-center border">
          <RadioGroupItem className="" value="more" id="more" />
          <Label htmlFor="more" className="flex flex-col items-center">
            <CircleEllipsisIcon />
            일반
          </Label>
        </div>
      </RadioGroup>
    </>
  );
}
