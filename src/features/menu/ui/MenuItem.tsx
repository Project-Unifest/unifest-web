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

interface MenuItemPropsType {
  boothId: number;
  id?: number;
  name: string;
  changeName: (newName: string) => void;
  price: number;
  changePrice: (newPrice: number) => void;
  imgUrl?: string;
  changeImage: (imgUrl: string) => void;
  remove: () => void;
  generateId: (id: number) => void;
}

export function MenuItem({
  boothId,
  id: menuItemId,
  name,
  price,
  imgUrl,
  changeName,
  changePrice,
  changeImage,
  remove,
  generateId,
}: MenuItemPropsType) {
  const uploadAuthMemuItem = useAuthFetch(uploadMenuItem);
  const deleteAuthMemuItem = useAuthFetch(deleteMenuItem);

  const canBeRegistered = Boolean(!menuItemId && name && price);

  console.log(imgUrl);
  const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("invoked");
    const file = event.target.files![0];
    if (!file) {
      return;
    }
    if (file.size > 1000000) {
      alert("파일 사이즈가 너무 큽니다.");
      return;
    }
    const { imgUrl } = await uploadImage(file);
    changeImage(imgUrl);
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
            onChange={(event) => changeName(event.target.value)}
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
              remove();
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
            onChange={(event) => changePrice(Number(event.target.value))}
          />
          {canBeRegistered && (
            <Button
              type="button"
              onClick={async () => {
                const id = await uploadAuthMemuItem(boothId, {
                  name,
                  price,
                  imgUrl,
                });
                generateId(id);
              }}
            >
              등록하기
            </Button>
          )}
        </div>
      </div>
    </CardContent>
  );
}
