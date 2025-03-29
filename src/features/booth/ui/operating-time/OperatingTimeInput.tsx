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
  errors?: Record<string, string>;
}

export function OperatingTimeInput({
  operatingTimes,
  onTimeChange,
  onRemoveDate,
  errors = {},
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

  // 시간 검증 - 시작 시간이 종료 시간보다 늦은지 확인
  const isInvalidTimeRange = (openTime: string, closeTime: string): boolean => {
    if (!openTime || !closeTime || openTime === "" || closeTime === "")
      return false;
    return openTime >= closeTime;
  };

  // 날짜 순서대로 정렬
  const sortedOperatingTimes = [...operatingTimes].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="space-y-3">
      {sortedOperatingTimes.map((time) => {
        const isMissingOpenTime = !time.openTime || time.openTime === "";
        const isMissingCloseTime = !time.closeTime || time.closeTime === "";
        const isTimeRangeInvalid = isInvalidTimeRange(
          time.openTime,
          time.closeTime,
        );
        const hasError =
          isMissingOpenTime || isMissingCloseTime || isTimeRangeInvalid;
        const errorMessage =
          errors[time.date] ||
          (isTimeRangeInvalid ? "시작 시간은 종료 시간보다 빨라야 합니다" : "");

        return (
          <div key={time.date} className="space-y-1">
            <div className="flex items-center">
              <div className="mr-3 flex items-center">
                <button
                  onClick={() => onRemoveDate(time.date)}
                  className="text-gray-500 hover:text-gray-700 mr-2"
                  type="button"
                >
                  ⊗
                </button>
                <span className="font-medium">
                  {formatDateDisplay(time.date)}
                </span>
              </div>

              <div className="flex flex-1 items-center justify-end">
                <input
                  className={`no-calendar-indicator w-32 rounded-[12px] border px-[15px] py-[7px] text-[16px] font-bold ${
                    isMissingOpenTime ? "border-red-500" : ""
                  }`}
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
                  value={
                    time.openTime && time.openTime !== ""
                      ? convertToHHMM(time.openTime)
                      : ""
                  }
                  placeholder="시작시간"
                />
                <span className="mx-2">~</span>
                <input
                  className={`no-calendar-indicator w-32 rounded-[12px] border px-[15px] py-[7px] text-[16px] font-bold ${
                    isMissingCloseTime || isTimeRangeInvalid
                      ? "border-red-500"
                      : ""
                  }`}
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
                  value={
                    time.closeTime && time.closeTime !== ""
                      ? convertToHHMM(time.closeTime)
                      : ""
                  }
                  placeholder="종료시간"
                />
              </div>
            </div>

            {isTimeRangeInvalid && (
              <div className="text-right text-sm font-medium text-red-500">
                시작 시간은 종료 시간보다 빨라야 합니다
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
