import { Button } from "@/src/shared/ui/button";
import React from "react";

interface OperatingDaysCalendarProps {
  selectedDates: string[];
  selectedMonth: number;
  currentYear: number;
  onDateSelect: (date: string) => void;
  onMonthChange: (month: number) => void;
  toggleDatePicker: () => void;
}

export function OperatingDaysCalendar({
  selectedDates,
  selectedMonth,
  currentYear,
  onDateSelect,
  onMonthChange,
  toggleDatePicker,
}: OperatingDaysCalendarProps) {
  // 달력 관련 헬퍼 함수
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  // 달력 렌더링
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
  const rows = [];

  // 이전 달의 날짜 표시
  const prevMonthDays = [];
  for (let i = 0; i < firstDay; i++) {
    const prevMonthDate = new Date(currentYear, selectedMonth - 1, 0 - i);
    prevMonthDays.unshift(
      <div
        key={`prev-${i}`}
        className="text-gray-300 flex h-10 items-center justify-center opacity-50"
      >
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
        className="relative flex h-10 cursor-pointer items-center justify-center"
        onClick={() => onDateSelect(dateStr)}
      >
        {isSelected ? (
          <>
            <div className="absolute h-8 w-8 rounded-full bg-[#FF4785]"></div>
            <span className="relative z-10 font-bold text-white">{i}</span>
          </>
        ) : (
          <span>{i}</span>
        )}
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
      <div
        key={`next-${i}`}
        className="text-gray-300 flex h-10 items-center justify-center opacity-50"
      >
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
      <Button
        type="button"
        className="mb-4 w-full text-xs font-normal"
        onClick={toggleDatePicker}
      >
        운영일 추가하기 ∧
      </Button>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            onMonthChange(selectedMonth === 1 ? 12 : selectedMonth - 1)
          }
          className="p-1"
        >
          &lt;
        </button>
        <h2 className="text-lg font-bold">{selectedMonth}월</h2>
        <button
          type="button"
          onClick={() =>
            onMonthChange(selectedMonth === 12 ? 1 : selectedMonth + 1)
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
}
