import { Button } from "@/src/shared/ui/button";
import React, { useEffect, useState } from "react";
import { OperatingDaysCalendar } from "./operating-time/OperatingDaysCalendar";
import { OperatingTimeInput } from "./operating-time/OperatingTimeInput";
import { OperatingTime, convertToHHMMSS } from "../model/operating-time";

interface BoothTimeProps {
  operatingTimes: OperatingTime[];
  onOperatingTimesChange: (times: OperatingTime[]) => void;
  resetBoothTime: () => void;
}

export function BoothTimeForm({
  operatingTimes: initialOperatingTimes,
  onOperatingTimesChange,
  resetBoothTime,
}: BoothTimeProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [currentYear] = useState(new Date().getFullYear());
  const [showOperatingTimes, setShowOperatingTimes] = useState(true);
  const [operatingTimes, setOperatingTimes] = useState<OperatingTime[]>([]);

  // 초기 operatingTimes 설정 - 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    if (initialOperatingTimes.length > 0) {
      setOperatingTimes(initialOperatingTimes);
      setSelectedDates(initialOperatingTimes.map((time) => time.date));
      setShowOperatingTimes(true);
    } else {
      setOperatingTimes([]);
      setSelectedDates([]);
      setShowOperatingTimes(false);
    }
  }, []); // 의존성 배열을 비워서 마운트 시 한 번만 실행

  const handleDateSelect = (date: string) => {
    // 이미 선택된 날짜인지 확인
    const isSelected = selectedDates.includes(date);

    if (isSelected) {
      // 이미 선택된 날짜라면 제거
      const newSelectedDates = selectedDates.filter((d) => d !== date);
      setSelectedDates(newSelectedDates);

      // 운영시간에서도 제거
      const newOperatingTimes = operatingTimes.filter(
        (time) => time.date !== date,
      );
      setOperatingTimes(newOperatingTimes);
      onOperatingTimesChange(newOperatingTimes);
    } else {
      // 새로운 날짜 추가
      const newSelectedDates = [...selectedDates, date];
      setSelectedDates(newSelectedDates);

      // 운영시간에 추가 (시작시간과 종료시간 모두 비워두기)
      const newDate = {
        date,
        openTime: null,
        closeTime: null,
      };

      const newOperatingTimes = [...operatingTimes, newDate];
      setOperatingTimes(newOperatingTimes);
      onOperatingTimesChange(newOperatingTimes);
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

    setOperatingTimes(updatedTimes);
    onOperatingTimesChange(updatedTimes);
  };

  const handleRemoveDate = (date: string) => {
    const newSelectedDates = selectedDates.filter((d) => d !== date);
    setSelectedDates(newSelectedDates);

    const newOperatingTimes = operatingTimes.filter(
      (time) => time.date !== date,
    );
    setOperatingTimes(newOperatingTimes);
    onOperatingTimesChange(newOperatingTimes);

    if (newOperatingTimes.length === 0) {
      setShowOperatingTimes(false);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    if (showDatePicker && operatingTimes.length === 0) {
      setShowOperatingTimes(false);
    }
  };

  return (
    <div className="booth-time-form">
      {!showOperatingTimes ? (
        <Button
          type="button"
          className="w-full"
          onClick={() => {
            setShowDatePicker(true);
            setShowOperatingTimes(true);
          }}
        >
          운영일 추가하기
        </Button>
      ) : (
        <>
          {/* 선택된 날짜별 시간 설정 */}
          <OperatingTimeInput
            operatingTimes={operatingTimes}
            onTimeChange={handleTimeChange}
            onRemoveDate={handleRemoveDate}
          />
        </>
      )}

      {/* 날짜 선택 달력 */}
      {showDatePicker && (
        <div className="date-picker-modal mt-4 rounded-lg border p-4">
          <OperatingDaysCalendar
            selectedDates={selectedDates}
            selectedMonth={selectedMonth}
            currentYear={currentYear}
            onDateSelect={handleDateSelect}
            onMonthChange={setSelectedMonth}
            toggleDatePicker={toggleDatePicker}
          />
          <Button
            type="button"
            className="mt-2 w-full"
            onClick={() => setShowDatePicker(false)}
          >
            완료
          </Button>
        </div>
      )}

      {!showDatePicker && showOperatingTimes && (
        <Button
          type="button"
          className="mt-4 w-full"
          onClick={() => setShowDatePicker(true)}
        >
          운영일 추가하기
        </Button>
      )}
    </div>
  );
}
