export interface OperatingTime {
  date: string; // 'YYYY-MM-DD' 형식
  openTime: string | null;
  closeTime: string | null;
}

export const convertToHHMM = (time: string): string => {
  // 문자열을 ':'로 분할하여 [hours, minutes, seconds] 배열을 얻음
  const [hours, minutes] = time.split(":");

  // 'hh:mm' 형식으로 리턴
  return `${hours}:${minutes}`;
};

export const convertToHHMMSS = (time: string): string => {
  const [hours, minutes] = time.split(":");

  // 'hh:mm:ss' 형식으로 리턴
  return `${hours}:${minutes}:00`;
};

export const formatDateDisplay = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];

  return `${month}월 ${day}일 (${weekday})`;
};
