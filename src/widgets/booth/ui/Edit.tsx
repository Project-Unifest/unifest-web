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
import { useFieldArray, useForm } from "react-hook-form";
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
import {
  usePatchBoothSchedule,
  useUpdateBooth,
} from "@/src/features/booth/api";
import {
  useCreateMenuItem,
  useDeleteMenuItem,
  useUpdateMenuItem,
} from "@/src/features/menu/api";
import { useEffect, useState } from "react";
import {
  MemberDetailResponse,
  memberKeys,
  useGetMyProfile,
} from "@/src/entities/members/api";
import { useQueryClient } from "@tanstack/react-query";
import { bool } from "prop-types";
import Spinner from "@/src/shared/ui/spinner";
import { MenuStatus } from "@/src/features/menu/lib/types";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  imgUrl?: string;
  state: MenuItemState;
}
interface UnifestTime {
  date: string;
  openTime: string;
  closeTime: string;
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
    scheduleList,
    editThumbnail,
    updateScheduleList,
    addSchedule,
    removeSchedule,
    resetSchedules,
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
    state.scheduleList,
    state.editThumbnail,
    state.updateScheduleList,
    state.addSchedule,
    state.removeSchedule,
    state.resetSchedules,
    state.menus,
    state.addMenuItem,
    state.editMenuItem,
    state.removeMenuItem,
  ]);

  const [menuItemParent] = useAutoAnimate();

  const router = useRouter();

  const form = useForm<z.infer<typeof boothEditSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(boothEditSchema),
    defaultValues: {
      name,
      category,
      warning,
      location,
      description,
      latitude,
      longitude,
      scheduleList,
      menuList,
    },
  });

  const { reset } = form;

  const [parent] = useAutoAnimate();

  const { mutateAsync: updateBooth } = useUpdateBooth(boothId);
  const { mutateAsync: createMenuItem } = useCreateMenuItem(boothId);
  const { mutateAsync: updateMenuItem } = useUpdateMenuItem();
  const { mutateAsync: patchBoothSchedule } = usePatchBoothSchedule(boothId);
  const queryClient = useQueryClient();

  const { data: myProfile } = useGetMyProfile();
  const [originMenus, setOriginMenus] = useState<number[]>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "menuList",
  });

  useEffect(() => {
    setOriginMenus(menuList.map((value) => value.id));
  }, []);

  const handleFormSubmit = form.handleSubmit(async (data: z.infer<typeof boothEditSchema>) => {
    const booth = myProfile.booths.find((booth) => booth.id === boothId)!;
    const { scheduleList, menuList, ...rest } = data;
    // Update booth first
    const { data: editedBooth } = await updateBooth({
      thumbnail,
      ...rest,
    });

    // Process all menu items sequentially with Promise.all
    await Promise.all(
      menuList.map(async (menuItem) => {
        const { id: menuId, ...menuData } = menuItem;
        const menu = booth?.menus.find((menu) => menu.id === menuId);

        if (menu) {
          // Update existing menu item
          await updateMenuItem({
            menuId,
            menuData,
          });
        } else {
          // Create new menu item
          await createMenuItem(menuData);
        }
      }),
    );

    // Update schedule after all menu operations are complete
    await patchBoothSchedule({ scheduleList });

    // Only navigate after all operations are complete
    router.push("/");
  });



  return (
    <>
      <EditImageBox thumbnail={thumbnail} editThumbnail={editThumbnail} />
      <Form {...form}>
        <form onSubmit={handleFormSubmit}>
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
                    className="flex w-full items-center justify-start gap-4 pb-4"
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
                        주점
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
                        먹거리
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
                        이벤트
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
                        일반
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
              <FormField
                name="scheduleList"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <BoothTimeForm
                        operatingTimes={scheduleList.map((schedule) => ({
                          date: schedule.date,
                          openTime: schedule.openTime,
                          closeTime: schedule.closeTime,
                        }))}
                        onOperatingTimesChange={(times: UnifestTime[]) => {
                          if (times.length > 0) {
                            // 모든 일정 정보를 scheduleList에 저장 (시간이 설정되지 않은 것도 포함)
                            const allOperatingTimes = times.map(
                              (time: UnifestTime) => ({
                                date: time.date,
                                openTime: time.openTime || "",
                                closeTime: time.closeTime || "",
                              }),
                            );

                            updateScheduleList(allOperatingTimes);
                            field.onChange(allOperatingTimes);
                          } else {
                            resetSchedules();
                            field.onChange([]);
                          }
                        }}
                        resetBoothTime={resetSchedules}
                        errors={form.formState.errors}
                      />
                    </FormControl>
                    {form.formState.errors.scheduleList &&
                      form.formState.errors.scheduleList.message && (
                        <div className="mt-3 rounded-md bg-red-50 p-2 text-sm font-semibold text-red-500">
                          {form.formState.errors.scheduleList.message}
                        </div>
                      )}
                  </FormItem>
                )}
              />
            </CardHeader>
          </Card>
          <Card ref={menuItemParent}>
            <CardHeader>
              <CardTitle>메뉴</CardTitle>
            </CardHeader>
            {fields.map((menuItem, index) => (
              <MenuItemForm
                key={menuItem.id}
                index={index}
                register={form.register}
                control={form.control}
                onRemove={() => remove(index)}
                errors={form.formState.errors.menuList?.[index]}
                // isOrigin={originMenus?.includes(menuItem.id) ?? false}
                {...menuItem}
              />
            ))}
            <CardFooter>
              <Button
                type="button"
                className="w-full"
                onClick={() => append({
                  id: menuList.length + 1,
                  name: "",
                  price: 0,
                  menuStatus: MenuStatus.Enough,
                  imgUrl: null,
                })}
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
