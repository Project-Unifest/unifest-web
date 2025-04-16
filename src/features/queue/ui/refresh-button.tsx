import RefreshIcon from "@/src/shared/ui/RefreshIcon";
import React from "react";

interface RefreshButtonPropsType {
  onRefresh: () => void | Promise<void>;
  disabled?: boolean;
}

export default function RefreshButton({
  onRefresh,
  disabled = false,
}: RefreshButtonPropsType) {
  const handleClick = () => {
    if (!disabled) {
      onRefresh();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={disabled ? "cursor-not-allowed opacity-50" : ""}
    >
      <RefreshIcon />
    </button>
  );
}
