import React, { useRef } from "react";
import {
  OperatingTime,
  convertToHHMM,
  formatDateDisplay,
} from "../../model/operating-time";

interface OperatingTimeInputProps {
  operatingTimes: OperatingTime[];
  onTimeChange: (date: string, type: "open" | "close", value: string) => void;
  onRemoveDate: (date: string) => void;
}

export function OperatingTimeInput({
  operatingTimes,
  onTimeChange,
  onRemoveDate,
}: OperatingTimeInputProps) {
  const openTimeInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const closeTimeInputRefs = useRef<Record<string, HTMLInputElement | null>>(
    {},
  );

  // 인풋 태그를 클릭했을 때 focus 이벤트를 트리거
  const handleInputClick = (ref: HTMLInputElement | null) => {
    if (ref) {
      ref.showPicker(); // 시간 선택 창을 강제로 엶
    }
  };

  // ref 콜백 함수 정의
  const setOpenTimeInputRef =
    (date: string) => (el: HTMLInputElement | null) => {
      openTimeInputRefs.current[date] = el;
    };

  const setCloseTimeInputRef =
    (date: string) => (el: HTMLInputElement | null) => {
      closeTimeInputRefs.current[date] = el;
    };

  return (
    <div className="space-y-3">
      {operatingTimes.map((time) => (
        <div key={time.date} className="flex items-center">
          <div className="mr-3 flex items-center">
            <button
              onClick={() => onRemoveDate(time.date)}
              className="text-gray-500 hover:text-gray-700 mr-2"
              type="button"
            >
              ⊗
            </button>
            <span className="font-medium">{formatDateDisplay(time.date)}</span>
          </div>

          <div className="flex flex-1 items-center justify-end">
            <input
              className="no-calendar-indicator w-24 rounded-[12px] border px-[20px] py-[7px] text-[16px] font-bold"
              aria-label="시작 시간"
              type="time"
              ref={setOpenTimeInputRef(time.date)}
              onChange={(e) => {
                if (e.target.value) {
                  onTimeChange(time.date, "open", e.target.value);
                }
              }}
              onClick={() =>
                handleInputClick(openTimeInputRefs.current[time.date])
              }
              value={time.openTime ? convertToHHMM(time.openTime) : ""}
              placeholder="시작시간"
            />
            <span className="mx-2">~</span>
            <input
              className="no-calendar-indicator w-24 rounded-[12px] border px-[20px] py-[7px] text-[16px] font-bold"
              aria-label="종료 시간"
              type="time"
              ref={setCloseTimeInputRef(time.date)}
              onChange={(e) => {
                if (e.target.value) {
                  onTimeChange(time.date, "close", e.target.value);
                }
              }}
              onClick={() =>
                handleInputClick(closeTimeInputRefs.current[time.date])
              }
              value={time.closeTime ? convertToHHMM(time.closeTime) : ""}
              placeholder="종료시간"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
