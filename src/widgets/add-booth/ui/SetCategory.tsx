"use client";

import { BoothCategory } from "@/src/shared/lib/types";
import { useBoothDraftStore } from "@/src/shared/model/provider/booth-draft-store-provider";
import AlcoholIcon from "@/src/shared/ui/AlcoholIcon";
import { Button } from "@/src/shared/ui/button";
import CircleEllipsisIcon from "@/src/shared/ui/CircleEllipsisIcon";
import EventIcon from "@/src/shared/ui/EventIcon";
import FoodIcon from "@/src/shared/ui/FoodIcon";
import { RadioGroup, RadioGroupItem } from "@/src/shared/ui/radio-group";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TextNoneIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React, { useState } from "react";

export function SetCategory() {
  const [category, editCategory] = useBoothDraftStore((state) => [
    state.category,
    state.editCategory,
  ]);
  const isCategorySelected = Boolean(category);

  const [parent] = useAutoAnimate();

  return (
    <>
      <div className="mb-10 flex  flex-col items-center justify-start space-y-3">
        <h2 className="text-lg font-semibold">부스의 분류는 무엇인가요</h2>
        <p className="text-xs font-medium text-gray">
          이후 부스 편집을 통해 언제는 수정 가능합니다.
        </p>
      </div>
      <RadioGroup
        className="grid auto-rows-[173px] grid-cols-2 gap-x-[17px] gap-y-[14px]"
        value={category}
        onValueChange={editCategory}
      >
        <Label
          htmlFor="bar"
          className={`flex cursor-pointer flex-col items-center justify-between rounded-xl border pb-7 pt-12 ${category === "bar" ? "border-pink" : "border-[#B7B7B7]"}`}
        >
          <RadioGroupItem
            className="sr-only"
            value={BoothCategory.BAR}
            id="bar"
          />
          <AlcoholIcon
            className={`${category === BoothCategory.BAR ? "text-pink" : "text-[#b2b2b2]"}`}
          />
          <div
            className={`text-base font-bold ${category === BoothCategory.BAR ? "text-pink" : "text-[#A7A7A7]"}`}
          >
            주점
          </div>
        </Label>

        <Label
          htmlFor="food"
          className={`flex cursor-pointer flex-col items-center justify-between rounded-xl border pb-7 pt-12 ${category === BoothCategory.FOOD ? "border-pink" : "border-[#B7B7B7]"}`}
        >
          <RadioGroupItem
            className="sr-only"
            value={BoothCategory.FOOD}
            id="food"
          />
          <FoodIcon
            className={`${category === BoothCategory.FOOD ? "text-pink" : "text-[#b2b2b2]"}`}
          />
          <div className="text-base font-bold text-[#A7A7A7]">먹거리</div>
        </Label>

        <Label
          htmlFor="event"
          className={`flex cursor-pointer flex-col items-center justify-between rounded-xl border pb-7 pt-7 ${category === BoothCategory.EVENT ? "border-pink" : "border-[#B7B7B7]"}`}
        >
          <RadioGroupItem
            className="sr-only"
            value={BoothCategory.EVENT}
            id="event"
          />
          <EventIcon
            className={`${category === BoothCategory.EVENT ? "text-pink" : "text-[#b2b2b2]"}`}
          />
          <div className="text-base font-bold text-[#A7A7A7]">이벤트</div>
        </Label>

        <Label
          htmlFor="more"
          className={`flex cursor-pointer flex-col items-center justify-between rounded-xl border pb-7 pt-9 ${category === BoothCategory.NORMAL ? "border-pink" : "border-[#B7B7B7]"}`}
        >
          <RadioGroupItem
            className="sr-only"
            value={BoothCategory.NORMAL}
            id="more"
          />
          <CircleEllipsisIcon
            className={`${category === BoothCategory.NORMAL ? "text-pink" : "text-[#b2b2b2]"}`}
          />
          <div className="text-base font-bold text-[#A7A7A7]">일반</div>
        </Label>
      </RadioGroup>

      <div
        className="sticky bottom-0 mt-auto flex  w-full bg-white pb-4 pt-4"
        ref={parent}
      >
        {isCategorySelected && (
          <Button className="w-full rounded-[10px] bg-pink py-3 text-white hover:bg-pink">
            {/* TODO send booth data to the server */}
            <Link href="/add-booth/set-description">입력완료</Link>
          </Button>
        )}
      </div>
    </>
  );
}
