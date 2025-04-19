"use client";

import { Button } from "@/src/shared/ui/button";
import { Textarea } from "@/src/shared/ui/textarea";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useCreateBooth } from "@/src/features/booth/api";
import useBoothDraftStore from "@/src/shared/model/store/booth-draft-store";

export function SetDescription() {
  const [parent] = useAutoAnimate();
  const router = useRouter();

  const { editDescription, name, category, description, latitude, longitude } =
    useBoothDraftStore((state) => ({
      editDescription: state.editDescription,
      name: state.name,
      category: state.category,
      description: state.description,
      latitude: state.latitude,
      longitude: state.longitude,
    }));

  const isFormValid = name && category && description;

  const handleDescriptionInputChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (event.target.value.length > 100) {
      return;
    }

    editDescription(event.target.value);
  };

  const { mutateAsync: createBooth } = useCreateBooth({
    onCreate: () => {
      router.push("/");
    },
  });

  // FIXME remove thumbnail and location from the field when the backend has been fixed
  const handleSubmitButtonClick = async () => {
    const id = await createBooth({
      name,
      category,
      description: description || "",
      detail: "",
      warning: "",
      thumbnail: "",
      longitude,
      latitude,
      festivalId: 2,
      location: "위치 지정 필요",
      menus: [],
      scheduleList: [],
    });
  };

  const handleSkipButtonClick = async () => {
    const id = await createBooth({
      name,
      category,
      description: description || "",
      detail: "",
      warning: "",
      thumbnail: "",
      longitude,
      latitude,
      festivalId: 2,
      location: "상세위치 지정 필요",
      menus: [],
      scheduleList: [],
    });
  };

  return (
    <>
      <div className="mb-16  flex flex-col items-center justify-start space-y-3">
        <h2 className="text-lg font-semibold">부스 간단 소개를 입력해주세요</h2>
        <p className="text-xs font-normal text-[#848484]">
          이후 부스 편집을 통해 언제든 수정 가능합니다.
        </p>
      </div>
      <Textarea
        value={description}
        onChange={handleDescriptionInputChange}
        placeholder="부스 컨텐츠, 판매 음식 등 자유롭게 부스를 소개해보세요."
        className="h-32 resize-none rounded-xl border border-[#D6D6D6] bg-[#FAFAFA] shadow-none placeholder:text-[#B0B0B0]"
      />
      <div className="mt-2 flex items-start justify-end">
        <div className="text-[10px] font-medium text-gray">
          {(description && description.length) || 0}/100자
        </div>
      </div>
      <div
        className="sticky bottom-0 mt-auto flex w-full gap-8 bg-white pb-4 pt-4"
        ref={parent}
      >
        <Button
          className="border-[#b7b7b7 flex-1 rounded-[10px] bg-white py-3 text-[#b7b7b7] hover:bg-white"
          onClick={handleSkipButtonClick}
        >
          건너뛰기
        </Button>
        {isFormValid && (
          <Button
            className="w-full flex-[2] rounded-[10px] bg-pink py-3 text-white hover:bg-pink"
            onClick={handleSubmitButtonClick}
          >
            입력완료
          </Button>
        )}
      </div>
    </>
  );
}
