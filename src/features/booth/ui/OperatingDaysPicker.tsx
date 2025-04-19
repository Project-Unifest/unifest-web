import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OperatingDaysPicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <div className="border-gray-300 flex w-80 flex-col items-center rounded-lg border bg-white p-4 shadow-lg">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date ?? undefined)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="운영 시작일 선택"
        className="border-gray-300 focus:ring-gray-200 w-full rounded-md border p-2 text-center text-sm focus:ring"
      />

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date ?? undefined)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="운영 종료일 선택"
        className="border-gray-300 focus:ring-gray-200 mt-2 w-full rounded-md border p-2 text-center text-sm focus:ring"
      />

      {startDate && endDate && (
        <div className="mt-4 flex justify-center space-x-2">
          <span className="rounded-full bg-red-400 px-3 py-1 text-sm text-white">
            {startDate.toLocaleDateString()}
          </span>
          <span className="text-gray-600">~</span>
          <span className="rounded-full bg-red-400 px-3 py-1 text-sm text-white">
            {endDate.toLocaleDateString()}
          </span>
        </div>
      )}

      <button
        onClick={() =>
          alert(
            `운영일: ${startDate?.toLocaleDateString()} ~ ${endDate?.toLocaleDateString()}`,
          )
        }
        className="bg-gray-800 hover:bg-gray-700 mt-4 rounded-md px-4 py-2 text-sm text-white transition"
      >
        완료
      </button>
    </div>
  );
};

export default OperatingDaysPicker;
