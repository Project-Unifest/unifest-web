import React from "react";

export default function CircleEllipsisIcon({
  className,
  ...props
}: Readonly<{
  className?: string;
}>) {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      {...props}
    >
      <circle cx="34" cy="34" r="31.5" stroke="currentColor" stroke-width="5" />
      <circle cx="18.5" cy="34.5" r="3.5" fill="currentColor" />
      <circle cx="34.5" cy="34.5" r="3.5" fill="currentColor" />
      <circle cx="50.5" cy="34.5" r="3.5" fill="currentColor" />
    </svg>
  );
}
