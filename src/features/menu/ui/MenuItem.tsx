import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import { Input } from "@/src/shared/ui/input";

import React, { ChangeEvent } from "react";

import { Label } from "@/src/shared/ui/label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/src/shared/ui/button";
import Image from "next/image";
import { uploadImage } from "../../booth/api/image";
import { deleteMenuItem, uploadMenuItem } from "../model/menu";
import { useAuthStore } from "@/src/shared/model/provider/auth-store-provider";
import useAuthFetch from "@/src/shared/model/auth/useAuthFetchList";
import { MenuItemState } from "@/src/shared/model/store/booth-edit-store";
import { useBoothEditStore } from "@/src/shared/model/provider/booth-edit-store.provider";
import { Product } from "@/src/shared/lib/types";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/src/shared/ui/radio-group";
import { MenuStatus } from "../lib/types";

interface MenuItemPropsType {
  boothId: number;
  id: number;
  name: string;
  price: number;
  imgUrl?: string;
  menuStatus: MenuStatus;
  edit: (id: number, menuProp: Partial<Product>) => void;
  add: () => void;
  remove: (id: number) => void;
}

export function MenuCard({
  boothId,
  id: menuItemId,
  name,
  price,
  imgUrl,
  menuStatus,
  add,
  remove,
  edit,
}: MenuItemPropsType) {
  const uploadAuthMemuItem = useAuthFetch(uploadMenuItem);
  const deleteAuthMemuItem = useAuthFetch(deleteMenuItem);

  const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (!file) {
      return;
    }
    if (file.size > 1000000) {
      alert("파일 사이즈가 너무 큽니다.");
      return;
    }
    const { imgUrl } = (await uploadImage(file)) as { imgUrl: string };
    edit(menuItemId, { imgUrl });
  };

  return (
    <CardContent className="flex items-center justify-center gap-3">
      {imgUrl ? (
        <Image width={80} height={80} alt="menu-item-image" src={imgUrl} />
      ) : (
        <Label className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#D9D9D9]">
          <div>
            <PlusCircledIcon className="h-6 w-6 text-[#4b4b4b]" />
            <span className="sr-only">메뉴 이미지 추가</span>
          </div>
          <Input
            type="file"
            className="sr-only"
            id="menu-1"
            accept="image/*"
            onChange={handleChangeImage}
          />
        </Label>
      )}
      <div className="flex flex-auto flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center">
          <Input
            placeholder="메뉴 이름"
            value={name}
            onChange={(event) => edit(menuItemId, { name: event.target.value })}
          />

          <Button
            type="button"
            onClick={async () => {
              if (menuItemId) {
                await deleteAuthMemuItem(menuItemId, {
                  name,
                  price,
                  imgUrl,
                });
              }
              remove(menuItemId);
            }}
          >
            삭제하기
          </Button>
        </div>
        <div className="flex w-full items-center justify-center">
          <Input
            placeholder="가격"
            type="number"
            value={price}
            onChange={(event) => {
              edit(menuItemId, { price: Number(event.target.value) });
            }}
          />
        </div>
        <RadioGroup
          value={menuStatus}
          onValueChange={(value: MenuStatus) => {
            edit(menuItemId, { menuStatus: value });
          }}
          className="flex w-full items-center justify-start space-x-3"
        >
          <div className="flex items-center space-x-1">
            <RadioGroupItem value={MenuStatus.Enough} id="option-enough" />
            <Label htmlFor="option-one">정상</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value={MenuStatus.Under50} id="option-under-50" />
            <Label htmlFor="option-under-50">50개 이하</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value={MenuStatus.Under10} id="option-under-10" />

            <Label htmlFor="option-under-10">10개 이하</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value={MenuStatus.SoldOut} id="option-sold-out" />
            <Label htmlFor="option-sold-out">품절</Label>
          </div>
        </RadioGroup>
      </div>
    </CardContent>
  );
}
