import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/src/shared/api/image";

interface ImageBoxPropsType {
  thumbnail: string;
  editThumbnail: (url: string) => void;
}

export function EditImageBox({ thumbnail, editThumbnail }: ImageBoxPropsType) {
  const [selectedFile, setSelectedFile] = useState<null | File>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (!file) {
      return;
    }
    const d = (await uploadImage(file)).data;
    editThumbnail(d.imgUrl);
    console.log(d.imgUrl);
  };

  return (
    <>
      {thumbnail ? (
        <Label
          htmlFor="booth-uploaded-image"
          className="relative flex h-60 w-full cursor-pointer items-center justify-center"
        >
          <Image src={thumbnail} alt="부스 이미지" fill />
          <Input
            type="file"
            className="sr-only"
            accept="image/*"
            id="booth-uploaded-image"
            onChange={handleFileChange}
          />
        </Label>
      ) : (
        <Label
          htmlFor="booth-image"
          className="flex h-60 w-full cursor-pointer items-center justify-center bg-[#C0C1C3]"
        >
          <div>
            <PlusCircledIcon className="h-6 w-6 text-[#4b4b4b]" />
            <span className="sr-only">부스 이미지 선택하기</span>
          </div>
          <Input
            type="file"
            className="sr-only"
            accept="image/*"
            id="booth-image"
            onChange={handleFileChange}
          />
        </Label>
      )}
    </>
  );
}
