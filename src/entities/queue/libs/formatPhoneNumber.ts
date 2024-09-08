export default function formatPhoneNumber(phoneNumber: string) {
  return [
    phoneNumber.slice(0, 3),
    phoneNumber.slice(3, 7),
    phoneNumber.slice(7),
  ].join("-");
}
