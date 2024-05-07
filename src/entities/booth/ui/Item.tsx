import { Booth } from "@/src/shared/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import React, { ReactNode } from "react";

type ItemPropsType = Pick<Booth, "name"> &
  Partial<Pick<Booth, "description" | "location">> & {
    editButton: ReactNode;
    deleteButton: ReactNode;
    switchButton: ReactNode;
  };

export function Item({
  name,
  description = "부스 설명 없음",
  location = "위치 설명 없음",
  editButton,
  deleteButton,
  switchButton,
}: ItemPropsType) {
  return (
    <Card data-testid={`booth-item-${name}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{name}</CardTitle>
          {switchButton}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{location}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        {editButton}
        {deleteButton}
      </CardFooter>
    </Card>
  );
}
