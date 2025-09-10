import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns'

export function convertToKoreaDate(utcString: string) {
  const koreaDate = new TZDate(utcString, "Asia/Seoul");
  return format(koreaDate, "M월 d일 HH:mm:ss")
}
