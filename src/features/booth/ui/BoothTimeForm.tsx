import { Button } from "@/src/shared/ui/button";
import React, { useRef, useState } from "react";

interface BoothTimeProps {
  openTime?: string;
  closeTime?: string;
  editOpenTime: (openTime: string) => void;
  editCloseTime: (closeTime: string) => void;
  resetBoothTime: () => void;
}

export function BoothTimeForm({
  openTime,
  closeTime,
  editCloseTime,
  editOpenTime,
  resetBoothTime,
}: BoothTimeProps) {
  const openTimeInputRef = useRef<HTMLInputElement | null>(null);
  const closeTimeInputRef = useRef<HTMLInputElement | null>(null);

  // 인풋 태그를 클릭했을 때 focus 이벤트를 트리거
  const handleInputClick = (
    ref: React.MutableRefObject<HTMLInputElement | null>,
  ) => {
    if (ref.current) {
      ref.current.showPicker(); // 시간 선택 창을 강제로 엶
    }
  };

  const convertToHHMM = (time: string): string => {
    // 문자열을 ':'로 분할하여 [hours, minutes, seconds] 배열을 얻음
    const [hours, minutes] = time.split(":");

    // 'hh:mm' 형식으로 리턴
    return `${hours}:${minutes}`;
  };
  const convertToHHMMSS = (time: string): string => {
    const [hours, minutes] = time.split(":");

    // 'hh:mm:ss' 형식으로 리턴
    return `${hours}:${minutes}:00`;
  };

  const convertedOpenTime = openTime ? convertToHHMM(openTime) : "00:00";
  const convertedCloseTime = closeTime ? convertToHHMM(closeTime) : "00:00";

  return (
    <>
      {!!openTime && !!closeTime ? (
        <>
          <div className="flex flex-row items-center justify-center gap-[20px] pt-[12px]">
            <h1 className="text-[16px] font-semibold">시작 시간</h1>
            <input
              className="no-calendar-indicator rounded-[12px] border px-[60px] py-[7px] text-[16px] font-bold"
              aria-label="Time"
              type="time"
              ref={openTimeInputRef}
              onChange={(e) => {
                if (e.target.value) {
                  editOpenTime(convertToHHMMSS(e.target.value));
                }
              }}
              onClick={() => handleInputClick(openTimeInputRef)} // 클릭 시 시간 선택 창 열림
              value={convertedOpenTime}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-[20px]">
            <h1 className="text-[16px] font-semibold">종료 시간</h1>
            <input
              className="no-calendar-indicator rounded-[12px] border px-[60px] py-[7px] text-[16px] font-bold"
              aria-label="Time"
              type="time"
              ref={closeTimeInputRef}
              onChange={(e) => {
                if (e.target.value) {
                  editCloseTime(convertToHHMMSS(e.target.value));
                }
              }}
              onClick={() => handleInputClick(closeTimeInputRef)} // 클릭 시 시간 선택 창 열림
              value={convertedCloseTime}
            />
          </div>
        </>
      ) : (
        <>
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              editOpenTime("13:00:00");
              editCloseTime("18:00:00");
            }}
          >
            운영시간 추가하기
          </Button>
        </>
      )}
    </>
  );
}
