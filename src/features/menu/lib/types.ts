export const MenuStatus = {
  Enough: "ENOUGH",
  Under50: "UNDER_50",
  Under10: "UNDER_10",
  SoldOut: "SOLD_OUT",
} as const;

export type MenuStatus = (typeof MenuStatus)[keyof typeof MenuStatus];
