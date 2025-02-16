"use client";

import { useAuthStore } from "@/src/shared/model/provider/auth-store-provider";
import { Button } from "@/src/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/ui/dialog";
import TrashCanIcon from "@/src/shared/ui/TrashCanIcon";

import React from "react";
import { deleteBooth } from "../api/booth";
import { useBoothListStore } from "@/src/shared/model/provider/booth-list-store-provider";

interface DeleteButtonPropsType {
  boothId: number;
}

export function DeleteButton({ boothId }: DeleteButtonPropsType) {
  const deleteBoothFromStore = useBoothListStore((state) => state.delete);
  const handleDelete = async () => {
    const data = await deleteBooth(String(boothId));
    deleteBoothFromStore(boothId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="z-20 flex-1 rounded-xl border border-[#d2d2d2] bg-white text-pink hover:bg-white">
          <TrashCanIcon />
          부스 삭제하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>부스를 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            부스를 삭제하면 이전으로 되돌릴 수 없어요.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4 md:gap-0">
          <DialogClose asChild>
            <Button type="button">뒤로가기</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-red-600 hover:bg-red-600"
              onClick={handleDelete}
            >
              삭제하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
