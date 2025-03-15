import { Button } from "@/src/shared/ui/button";
import React, { useEffect, useRef, useState } from "react";

interface OperatingTime {
  date: string; // 'YYYY-MM-DD' 형식
  openTime: string | null;
  closeTime: string | null;
}

interface BoothTimeProps {
  operatingTimes: OperatingTime[];
  onOperatingTimesChange: (times: OperatingTime[]) => void;
  resetBoothTime: () => void;
}

export function BoothTimeForm({
  operatingTimes,
  onOperatingTimesChange,
  resetBoothTime,
}: BoothTimeProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [currentYear] = useState(new Date().getFullYear());

  const openTimeInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const closeTimeInputRefs = useRef<Record<string, HTMLInputElement | null>>(
    {},
  );

  useEffect(() => {
    // 기존 운영시간이 있으면 선택된 날짜로 설정
    if (operatingTimes.length > 0) {
      setSelectedDates(operatingTimes.map((time) => time.date));
    }
  }, [operatingTimes]);

  // 인풋 태그를 클릭했을 때 focus 이벤트를 트리거
  const handleInputClick = (ref: HTMLInputElement | null) => {
    if (ref) {
      ref.showPicker(); // 시간 선택 창을 강제로 엶
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

  const handleDateSelect = (date: string) => {
    // 이미 선택된 날짜인지 확인
    const isSelected = selectedDates.includes(date);

    if (isSelected) {
      // 이미 선택된 날짜라면 제거
      setSelectedDates((prev) => prev.filter((d) => d !== date));

      // 운영시간에서도 제거
      onOperatingTimesChange(
        operatingTimes.filter((time) => time.date !== date),
      );
    } else {
      // 새로운 날짜 추가
      setSelectedDates((prev) => [...prev, date]);

      // 운영시간에 추가 (기본값 설정)
      onOperatingTimesChange([
        ...operatingTimes,
        { date, openTime: "18:00:00", closeTime: "24:00:00" },
      ]);
    }
  };

  const handleTimeChange = (
    date: string,
    type: "open" | "close",
    value: string,
  ) => {
    const newTime = convertToHHMMSS(value);
    const updatedTimes = operatingTimes.map((time) => {
      if (time.date === date) {
        return {
          ...time,
          [type === "open" ? "openTime" : "closeTime"]: newTime,
        };
      }
      return time;
    });

    onOperatingTimesChange(updatedTimes);
  };

  const handleRemoveDate = (date: string) => {
    setSelectedDates((prev) => prev.filter((d) => d !== date));
    onOperatingTimesChange(operatingTimes.filter((time) => time.date !== date));
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(currentYear, selectedMonth);

    const days = [];
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

    // 요일 헤더 추가
    days.push(
      <div key="weekdays" className="mb-2 grid grid-cols-7 text-center">
        {weekdays.map((day) => (
          <div key={day} className="text-sm font-medium">
            {day}
          </div>
        ))}
      </div>,
    );

    // 달력 그리드 생성
    let dayCounter = 1;
    const rows = [];

    // 이전 달의 날짜 표시
    const prevMonthDays = [];
    for (let i = 0; i < firstDay; i++) {
      const prevMonthDate = new Date(currentYear, selectedMonth - 1, 0 - i);
      prevMonthDays.unshift(
        <div key={`prev-${i}`} className="text-gray-300 p-2 text-center">
          {prevMonthDate.getDate()}
        </div>,
      );
    }

    // 현재 달의 날짜 표시
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentYear}-${String(selectedMonth).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const isSelected = selectedDates.includes(dateStr);

      currentMonthDays.push(
        <div
          key={`current-${i}`}
          className={`cursor-pointer rounded-full p-2 text-center ${
            isSelected ? "bg-pink-500 text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => handleDateSelect(dateStr)}
        >
          {i}
        </div>,
      );
    }

    // 다음 달의 날짜 표시
    const nextMonthDays = [];
    const totalCells = 42; // 6주 x 7일
    const remainingCells =
      totalCells - (prevMonthDays.length + currentMonthDays.length);

    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push(
        <div key={`next-${i}`} className="text-gray-300 p-2 text-center">
          {i}
        </div>,
      );
    }

    // 모든 날짜를 하나의 그리드로 결합
    rows.push(
      <div key="days" className="grid grid-cols-7 gap-1">
        {[...prevMonthDays, ...currentMonthDays, ...nextMonthDays]}
      </div>,
    );

    return (
      <div className="calendar">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() =>
              setSelectedMonth((prev) => (prev === 1 ? 12 : prev - 1))
            }
            className="p-1"
          >
            &lt;
          </button>
          <h2 className="text-lg font-bold">{selectedMonth}월</h2>
          <button
            onClick={() =>
              setSelectedMonth((prev) => (prev === 12 ? 1 : prev + 1))
            }
            className="p-1"
          >
            &gt;
          </button>
        </div>
        {days}
        {rows}
      </div>
    );
  };

  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];

    return `${month}월 ${day}일 (${weekday})`;
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
    <div className="booth-time-form">
      {operatingTimes.length === 0 ? (
        <Button
          type="button"
          className="w-full"
          onClick={() => setShowDatePicker(true)}
        >
          운영일 추가하기
        </Button>
      ) : (
        <>
          {/* 선택된 날짜별 시간 설정 */}
          <div className="space-y-3">
            {operatingTimes.map((time, index) => (
              <div key={time.date} className="flex items-center">
                <div className="mr-3 flex items-center">
                  <button
                    onClick={() => handleRemoveDate(time.date)}
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
                    className="no-calendar-indicator w-24 rounded-[12px] border px-[20px] py-[7px] text-[16px] font-bold"
                    aria-label="시작 시간"
                    type="time"
                    ref={setOpenTimeInputRef(time.date)}
                    onChange={(e) => {
                      if (e.target.value) {
                        handleTimeChange(time.date, "open", e.target.value);
                      }
                    }}
                    onClick={() =>
                      handleInputClick(openTimeInputRefs.current[time.date])
                    }
                    value={
                      time.openTime ? convertToHHMM(time.openTime) : "18:00"
                    }
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
                        handleTimeChange(time.date, "close", e.target.value);
                      }
                    }}
                    onClick={() =>
                      handleInputClick(closeTimeInputRefs.current[time.date])
                    }
                    value={
                      time.closeTime ? convertToHHMM(time.closeTime) : "24:00"
                    }
                    placeholder="종료시간"
                  />
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            className="mt-4 w-full"
            onClick={() => setShowDatePicker(true)}
          >
            운영일 추가하기 ∧
          </Button>
        </>
      )}

      {/* 날짜 선택 달력 */}
      {showDatePicker && (
        <div className="date-picker-modal mt-4 rounded-lg border p-4">
          {renderCalendar()}
          <Button
            type="button"
            className="mt-4 w-full"
            onClick={() => setShowDatePicker(false)}
          >
            완료
          </Button>
        </div>
      )}
    </div>
  );
}
