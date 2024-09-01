import RefreshIcon from "@/src/shared/ui/RefreshIcon";
import React from "react";

interface RefreshButtonPropsType {
  onRefresh: () => void | Promise<void>;
}

export default function RefreshButton({ onRefresh }: RefreshButtonPropsType) {
  const handleClick = () => {
    onRefresh();
  };

  return (
    <button onClick={handleClick}>
      <RefreshIcon />
    </button>
  );
}
