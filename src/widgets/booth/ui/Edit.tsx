"use client";

import { Menu } from "@/src/entities/menu/ui/Menu";
import { EditImageBox } from "@/src/features/booth/ui/EditImageBox";
import { EditTextBox } from "@/src/features/booth/ui/EditTextBox";
import { CampusPosition } from "@/src/shared/model/store/booth-store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shared/ui/form";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { boothEditSchema } from "../model/booth-edit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/src/shared/ui/input";
import { Textarea } from "@/src/shared/ui/textarea";
import { z } from "zod";
import { Button } from "@/src/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import { Label } from "@/src/shared/ui/label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RadioGroup, RadioGroupItem } from "@/src/shared/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/src/shared/ui/toggle-group";

export function Edit() {
  const form = useForm<z.infer<typeof boothEditSchema>>({
    resolver: zodResolver(boothEditSchema),
    defaultValues: {
      thumbnail: "https://www.naver.com",
      name: "",
      warning: "",
      location: "",
      description: "",
      latitude: CampusPosition.latitude,
      longitude: CampusPosition.longitude,
      menu: [],
    },
  });

  console.log(form.formState.errors);
  console.log(form.formState.isValid);
  console.log(form.getValues("category"));

  // TODO fetch booth from the backend

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [parent] = useAutoAnimate();

  return (
    <>
      <EditImageBox />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="thumbnail"
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
                        <RadioGroupItem value="bar" className="sr-only" />
                      </FormControl>
                      <FormLabel
                        className={`${field.value === "bar" ? "border-pink bg-[#FFF0F3] text-pink" : ""} flex h-8 w-full cursor-pointer items-center justify-center rounded-xl border`}
                      >
                        주점
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex-auto">
                      <FormControl>
                        <RadioGroupItem value="food" className="sr-only" />
                      </FormControl>
                      <FormLabel
                        className={`${field.value === "food" ? "border-pink bg-[#FFF0F3] text-pink" : ""} flex h-8 w-full cursor-pointer items-center justify-center rounded-xl border`}
                      >
                        음식
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex-auto">
                      <FormControl>
                        <RadioGroupItem value="event" className="sr-only" />
                      </FormControl>
                      <FormLabel
                        className={`${field.value === "event" ? "border-pink bg-[#FFF0F3] text-pink" : ""} flex h-8 w-full cursor-pointer items-center justify-center rounded-xl border`}
                      >
                        행사
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex-auto">
                      <FormControl>
                        <RadioGroupItem value="more" className="sr-only" />
                      </FormControl>
                      <FormLabel
                        className={`${field.value === "more" ? "border-pink bg-[#FFF0F3] text-pink" : ""} flex h-8 w-full cursor-pointer items-center justify-center rounded-xl border`}
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
          <Card>
            <CardHeader>
              <CardTitle>메뉴</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center gap-3">
              <Label className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#D9D9D9]">
                <div>
                  <PlusCircledIcon className="h-6 w-6 text-[#4b4b4b]" />
                  <span className="sr-only">메뉴 추가</span>
                </div>
                <Input
                  type="file"
                  className="sr-only"
                  id="menu-1"
                  accept="image/*"
                />
              </Label>
              <div className="flex flex-auto flex-col items-center justify-center">
                <Input placeholder="메뉴 이름" />
                <Input placeholder="가격" type="number" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">메뉴 추가하기</Button>
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
