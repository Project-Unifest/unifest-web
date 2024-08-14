const MILLISEC_TO_SECOND = 1000;
const SECOND_TO_MINUTE = 60;
const MINUTE_TO_HOUR = 60;
const MILLISEC_TO_HOUR = MILLISEC_TO_SECOND * SECOND_TO_MINUTE * MINUTE_TO_HOUR;

function convertToDate(dateString: string) {
  return new Date(dateString);
}

function convertToDateInKorea(utcDateString: string) {
  const utcDate = convertToDate(utcDateString);
  return new Date(utcDate.getTime() + 9 * MILLISEC_TO_HOUR);
}

function padZeros(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatDateString(dateString: string) {
  const dateInKorea = convertToDateInKorea(dateString);
  const [month, day, hours, minutes, seconds] = [
    dateInKorea.getMonth() + 1,
    dateInKorea.getDate(),
    dateInKorea.getHours(),
    dateInKorea.getMinutes(),
    dateInKorea.getMinutes(),
    dateInKorea.getSeconds(),
  ];

  return `${month}월 ${day}일 ${padZeros(hours)}:${padZeros(minutes)}:${padZeros(seconds)}`;
}
