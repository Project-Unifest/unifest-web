import { CardContent } from "@/src/shared/ui/card";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/src/shared/ui/button";
import Image from "next/image";

import { RadioGroup } from "@/src/shared/ui/radio-group";
import { RadioGroupItem } from "@/src/shared/ui/radio-group";
import { MenuStatus } from "../lib/types";
import { Controller, UseFormRegister, Control, FieldErrors, useController } from "react-hook-form";
import { FormMessage } from "@/src/shared/ui/form";

import { Product } from "@/src/shared/lib/types";
import { uploadImage } from "@/src/shared/api/image";

interface MenuCardProps {
  index: number;
  register: UseFormRegister<any>;   // 부모 useForm에서 내려줌
  control: Control<any>;            // Controller 쓸 때 필요
  errors?: FieldErrors<Product>;
  onRemove: () => void;
  imgUrl?: string | null;
}

export function MenuCard({
  index,
  register,
  control,
  errors,
  onRemove,
  imgUrl,
}: MenuCardProps) {
  const { field: imgField } = useController({
   control,
   name: `menuList.${index}.imgUrl`,  // string | null 로 유지
  });


  return (
    <>
      <CardContent className="flex items-center justify-center gap-3">
        {imgField.value ? (
          <Image width={80} height={80} alt="menu-item-image" src={imgField.value} />
        ) : (
          <Label
            className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#D9D9D9]"
            htmlFor={`menu-${index}-file`}
          >
            <div>
              <PlusCircledIcon className="h-6 w-6 text-[#4b4b4b]" />
              <span className="sr-only">메뉴 이미지 추가</span>
            </div>
            <Input
              type="file"
              className="sr-only"
              id={`menu-${index}-file`}
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const { data } = await uploadImage(file);
                  imgField.onChange(data.imgUrl);
                }
              }}
            />
          </Label>
        )}

        <div className="flex flex-auto flex-col items-start justify-center">
          <div className="flex w-full items-center justify-center gap-2">
            {/* 이름 */}
            <Input
              placeholder="메뉴 이름"
              {...register(`menuList.${index}.name`)}
            />
            <Button type="button" onClick={() => onRemove()}>
              삭제하기
            </Button>
          </div>
          {errors?.name && (
            <FormMessage className="text-red-500 text-left pl-3">
              {errors.name.message}
            </FormMessage>
          )}

          {/* 가격 */}
          <div className="flex w-full items-center justify-center">
            <Input
              placeholder="가격"
              type="number"
              {...register(`menuList.${index}.price`, { valueAsNumber: true })}
            />
          </div>
          {errors?.price && (
            <FormMessage className="text-red-500 text-left">
              {errors.price.message}
            </FormMessage>
          )}

          {/* 메뉴 상태 */}
          <Controller
            control={control}
            name={`menuList.${index}.menuStatus`}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex w-full items-center justify-start space-x-3"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value={MenuStatus.Enough} id={`enough-${index}`} />
                  <Label htmlFor={`enough-${index}`}>정상</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value={MenuStatus.Under50} id={`under50-${index}`} />
                  <Label htmlFor={`under50-${index}`}>50개 이하</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value={MenuStatus.Under10} id={`under10-${index}`} />
                  <Label htmlFor={`under10-${index}`}>10개 이하</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value={MenuStatus.SoldOut} id={`soldout-${index}`} />
                  <Label htmlFor={`soldout-${index}`}>품절</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors?.menuStatus && (
            <FormMessage className="text-red-500 text-center">
              {errors.menuStatus.message}
            </FormMessage>
          )}
        </div>
      </CardContent>
    </>
  );
}