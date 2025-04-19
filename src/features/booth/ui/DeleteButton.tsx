"use client";

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

import { useState } from "react";
import { useDeleteBooth } from "../api";
import useBoothListStore from "@/src/shared/model/store/booth-list-store";

interface DeleteButtonPropsType {
  boothId: number;
}

export function DeleteButton({ boothId }: DeleteButtonPropsType) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteBoothFromStore = useBoothListStore((state) => state.delete);
  const { mutate: deleteBooth, isPending } = useDeleteBooth(boothId, {
    onDelete: () => {
      deleteBoothFromStore(boothId);
      setIsOpen(false);
    },
  });

  const handleDelete = async () => {
    deleteBooth();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Button type="button" disabled={isPending}>
              뒤로가기
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-600"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "삭제 중..." : "삭제하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
