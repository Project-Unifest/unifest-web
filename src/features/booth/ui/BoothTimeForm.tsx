import { Button } from "@/src/shared/ui/button";
import React, { useEffect, useState } from "react";
import { OperatingDaysCalendar } from "./operating-time/OperatingDaysCalendar";
import { OperatingTimeInput } from "./operating-time/OperatingTimeInput";
import { OperatingTime, convertToHHMMSS } from "../model/operating-time";

interface BoothTimeProps {
  operatingTimes: OperatingTime[];
  onOperatingTimesChange: (times: OperatingTime[]) => void;
  resetBoothTime: () => void;
  errors?: any; // 폼 오류를 전달받을 수 있도록 props 추가
}

export function BoothTimeForm({
  operatingTimes: initialOperatingTimes,
  onOperatingTimesChange,
  resetBoothTime,
  errors,
}: BoothTimeProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [currentYear] = useState(new Date().getFullYear());
  const [showOperatingTimes, setShowOperatingTimes] = useState(true);
  const [operatingTimes, setOperatingTimes] = useState<OperatingTime[]>([]);
  const [timeErrors, setTimeErrors] = useState<Record<string, string>>({});

  // 초기 operatingTimes 설정 - 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    if (initialOperatingTimes.length > 0) {
      const sortedTimes = [...initialOperatingTimes].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      setOperatingTimes(sortedTimes);
      setSelectedDates(sortedTimes.map((time) => time.date).sort());
      setShowOperatingTimes(true);
    } else {
      setOperatingTimes([]);
      setSelectedDates([]);
      setShowOperatingTimes(false);
    }
  }, []); // 의존성 배열을 비워서 마운트 시 한 번만 실행

  // 오류 상태 업데이트
  useEffect(() => {
    if (errors && errors.scheduleList) {
      // 스케줄 리스트에 오류가 있을 경우 처리
      const newErrors: Record<string, string> = {};

      if (Array.isArray(errors.scheduleList)) {
        // 개별 스케줄 오류 처리
        errors.scheduleList.forEach((error: any, index: number) => {
          if (error && operatingTimes[index]) {
            if (error.openTime) {
              newErrors[operatingTimes[index].date] = error.openTime.message;
            } else if (error.closeTime) {
              newErrors[operatingTimes[index].date] = error.closeTime.message;
            }
          }
        });
      }

      setTimeErrors(newErrors);
    } else {
      setTimeErrors({});
    }
  }, [errors, operatingTimes]);

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
      const newSelectedDates = [...selectedDates, date].sort();
      setSelectedDates(newSelectedDates);

      // 운영시간에 추가 (시작시간과 종료시간 모두 빈 문자열로 설정)
      const newDate = {
        date,
        openTime: "",
        closeTime: "",
      };

      const newOperatingTimes = [...operatingTimes, newDate].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

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
        const updatedTime = {
          ...time,
          [type === "open" ? "openTime" : "closeTime"]: newTime,
        };
        return updatedTime;
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

    // 날짜를 제거하면 관련 오류도 제거
    const newErrors = { ...timeErrors };
    delete newErrors[date];
    setTimeErrors(newErrors);

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
            errors={timeErrors}
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
