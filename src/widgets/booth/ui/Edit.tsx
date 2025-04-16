"use client";

import { EditImageBox } from "@/src/features/booth/ui/EditImageBox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shared/ui/form";
import { useForm } from "react-hook-form";
import { boothEditSchema } from "../model/booth-edit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/src/shared/ui/input";
import { Textarea } from "@/src/shared/ui/textarea";
import { z } from "zod";
import { Button } from "@/src/shared/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/src/shared/ui/card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RadioGroup, RadioGroupItem } from "@/src/shared/ui/radio-group";
import { BoothCategory } from "@/src/shared/lib/types";
import { MenuItemForm } from "@/src/features/menu";
import { useRouter } from "next/navigation";
import useBoothEditStore, {
  MenuItemState,
} from "@/src/shared/model/store/booth-edit-store";
import { BoothTimeForm } from "@/src/features/booth";
import { useUpdateBooth } from "@/src/features/booth/api";
import {
  useCreateMenuItem,
  useDeleteMenuItem,
  useUpdateMenuItem,
} from "@/src/features/menu/api";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  imgUrl?: string;
  state: MenuItemState;
}

export function Edit({ boothId }: { boothId: number }) {
  const [
    name,
    category,
    description,
    detail,
    warning,
    location,
    latitude,
    longitude,
    thumbnail,
    openTime,
    closeTime,
    editThumbnail,
    editOpenTime,
    editCloseTime,
    resetBoothTime,
    menuList,
    addMenuItem,
    editMenuItem,
    removeMemuItem,
  ] = useBoothEditStore((state) => [
    state.name,
    state.category,
    state.description,
    state.detail,
    state.warning,
    state.location,
    state.latitude,
    state.longitude,
    state.thumbnail,
    state.openTime,
    state.closeTime,
    state.editThumbnail,
    state.editOpenTime,
    state.editCloseTime,
    state.resetBoothTime,
    state.menus,
    state.addMenuItem,
    state.editMenuItem,
    state.removeMenuItem,
  ]);

  const [menuItemParent] = useAutoAnimate();

  const router = useRouter();

  const form = useForm<z.infer<typeof boothEditSchema>>({
    resolver: zodResolver(boothEditSchema),
    defaultValues: {
      name,
      category,
      warning,
      location,
      description,
      latitude,
      longitude,
      openTime,
      closeTime,
    },
  });
  const changeOpenTimeInForm = (openTime: string | null) => {
    form.setValue("openTime", openTime);
  };
  const changeCloseTimeInForm = (closeTime: string | null) => {
    form.setValue("closeTime", closeTime);
  };

  const { reset } = form;

  const [parent] = useAutoAnimate();

  const { mutateAsync: updateBooth } = useUpdateBooth(boothId);
  const { mutateAsync: createMenuItem } = useCreateMenuItem(boothId, {
    onCreate: () => {
      router.push("/");
    },
  });
  const { mutateAsync: updateMenuItem } = useUpdateMenuItem();

  const onSubmit = async (data: any) => {
    const { data: editedBooth } = await updateBooth({
      thumbnail,
      ...data,
    });
    menuList.forEach(async (menuItem) => {
      const { data: res } = await updateMenuItem({
        menuId: menuItem.id,
        menuData: menuItem,
      });
      if (res === null) {
        const { data: id } = await createMenuItem(menuItem);
        id;
      }
    });
    router.push("/");
  };

  return (
    <>
      <EditImageBox thumbnail={thumbnail} editThumbnail={editThumbnail} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* <FormField
            name="thumbnail"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          /> */}
          <FormField
            name="latitude"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="longitude"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">카테고리 선택</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    required
                    className="flex w-full items-center justify-start gap-4"
                  >
                    <FormItem className="flex-auto">
                      <FormControl>
                        <RadioGroupItem
                          value={BoothCategory.BAR}
                          className="sr-only"
                        />
                      </FormControl>
                      <FormLabel
                        className={`${field.value === BoothCategory.BAR ? "border-pink bg-[#FFF0F3] text-pink" : ""} flex h-8 w-full cursor-pointer items-center justify-center rounded-xl border`}
                      >
                        체험
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex-auto">
                      <FormControl>
                        <RadioGroupItem
                          value={BoothCategory.FOOD}
                          className="sr-only"
                        />
                      </FormControl>
                      <FormLabel
                        className={`${field.value === BoothCategory.FOOD ? "border-pink bg-[#FFF0F3] text-pink" : ""} flex h-8 w-full cursor-pointer items-center justify-center rounded-xl border`}
                      >
                        푸드트럭
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex-auto">
                      <FormControl>
                        <RadioGroupItem
                          value={BoothCategory.EVENT}
                          className="sr-only"
                        />
                      </FormControl>
                      <FormLabel
                        className={`${field.value === BoothCategory.EVENT ? "border-pink bg-[#FFF0F3] text-pink" : ""} flex h-8 w-full cursor-pointer items-center justify-center rounded-xl border`}
                      >
                        교내
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex-auto">
                      <FormControl>
                        <RadioGroupItem
                          value={BoothCategory.NORMAL}
                          className="sr-only"
                        />
                      </FormControl>
                      <FormLabel
                        className={`${field.value === BoothCategory.NORMAL ? "border-pink bg-[#FFF0F3] text-pink" : ""} flex h-8 w-full cursor-pointer items-center justify-center rounded-xl border`}
                      >
                        교외
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="부스/주점 이름 *" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="warning"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="주의사항 (예: 컴퓨터공학부만 출입 가능)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="부스 상세 위치 (예: 청심대 앞)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>소개 글</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="내용을 입력해주세요"
                    {...field}
                    className="resize-none"
                    maxLength={100}
                  />
                </FormControl>
                <div className="mt-2 flex items-start justify-end">
                  <div className="text-[10px] font-medium text-gray">
                    {form.getValues("description").length}/100자
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>운영시간</CardTitle>
              <BoothTimeForm
                openTime={openTime}
                closeTime={closeTime}
                changeOpenTimeInForm={changeOpenTimeInForm}
                changeCloseTimeInForm={changeCloseTimeInForm}
                editOpenTime={editOpenTime}
                editCloseTime={editCloseTime}
                resetBoothTime={resetBoothTime}
              />
            </CardHeader>
          </Card>
          <Card ref={menuItemParent}>
            <CardHeader>
              <CardTitle>메뉴</CardTitle>
            </CardHeader>
            {menuList.map((menuItem) => (
              <MenuItemForm
                key={menuItem.id}
                boothId={boothId}
                remove={removeMemuItem}
                edit={editMenuItem}
                {...menuItem}
              />
            ))}
            <CardFooter>
              <Button
                type="button"
                className="w-full"
                onClick={() => addMenuItem()}
              >
                메뉴 추가하기
              </Button>
            </CardFooter>
          </Card>
          <div
            className="sticky bottom-0 mt-auto bg-white pb-4 pt-4 shadow-md"
            ref={parent}
          >
            <Button
              className="w-full flex-[2] rounded-[10px] bg-pink py-3 text-white hover:bg-pink"
              type="submit"
            >
              등록하기
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
