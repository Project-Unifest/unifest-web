import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import { Separator } from "@/src/shared/ui/separator";
import React, { ReactNode } from "react";
import formatPhoneNumber from "../libs/formatPhoneNumber";

interface GroupItemPropsType {
  id: string | number;
  waitingOrder?: number;
  partySize: number;
  tel: string;
  actionSlot?: ReactNode;
  status?: "active" | "completed" | "canceled";
}

export default function GroupItem({
  actionSlot,
  waitingOrder,
  id,
  partySize,
  tel,
  status = "active",
}: GroupItemPropsType) {
  const telInFormat = formatPhoneNumber(tel);
  return (
    <Card className="relative flex flex-col" as="li">
      <CardHeader className="p-4 pb-0">
        <CardDescription className="flex h-[22px] space-x-3">
          <div className="inline-flex h-[22px] items-center justify-center rounded-xl border border-solid  border-[#D2D2D2] px-4 text-xs font-normal text-[#F5687E]">
            {status === "active" && `${waitingOrder}번째`}
            {status === "completed" && `입장완료`}
            {status === "canceled" && `취소/부재`}
          </div>
          <Separator orientation="vertical" className="bg-[#E0E0E0]" />
          <span className="text-sm font-medium text-[#161616]">
            총 {partySize}명
          </span>
        </CardDescription>
        <CardTitle className="text-3xl font-bold">{id}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm font-normal text-[#8c8c8c]">{telInFormat}</p>
      </CardContent>
      <CardFooter className="absolute bottom-0 right-0">
        {actionSlot}
      </CardFooter>
    </Card>
  );
}
