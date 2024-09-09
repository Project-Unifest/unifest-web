import { Booth } from "@/src/shared/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import Link from "next/link";

import React, { ReactNode } from "react";
import { number, string } from "zod";

interface ItemPropsType {
  id: number;
  name: string;
  description: string;
  location: string;
  editButton: ReactNode;
  deleteButton: ReactNode;
  switchButton: ReactNode;
}

export function Item({
  id,
  name,
  description = "부스 설명 없음",
  location = "위치 설명 없음",
  editButton,
  deleteButton,
  switchButton,
}: ItemPropsType) {
  return (
    <div className="relative">
      <Card data-testid={`booth-item-${name}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="w-full flex-auto truncate">{name}</CardTitle>
            <div className="flex-none">{switchButton}</div>
          </div>
          <CardDescription className="line-clamp-2 text-ellipsis">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{location}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-2">
          {editButton}
          {deleteButton}
        </CardFooter>
      </Card>
      <Link
        href={`/booths/${id}`}
        className="absolute left-0 top-0 z-10 h-full w-full"
      />
    </div>
  );
}
