"use client";
import { useState } from "react";
import QueueTabsContainer from "@/src/entities/queue/ui/QueueTabsContainer";
import QueueTabs from "@/src/features/queue/ui/QueueTabs";
import NotifyButton from "@/src/features/queue/ui/NotifyButton";
import CancelButton from "@/src/features/queue/ui/CancelButton";
import GroupItem from "@/src/entities/queue/ui/GroupItem";
import { useParams } from "next/navigation";
import { StatusCode } from "@/src/shared/api/config";
import EnterButton from "@/src/features/queue/ui/EnterButton";
import { formatDateString } from "../lib/formatDateString";
import {
  useQueueGroupsQuery,
  useCancelGroupMutation,
  useCallGroupMutation,
  useCompleteGroupMutation,
} from "@/src/features/queue/api";

export default function Queue() {
  const [activatedTab, setActivatedTab] = useState<
    "active" | "completed" | "canceled"
  >("active");
  const params = useParams<{ boothId: string }>()!;
  const boothId = parseInt(params.boothId);

  const {
    data: groups,
    isLoading: isGroupsLoading,
    refetch: refetchGroups,
  } = useQueueGroupsQuery(boothId);

  const { mutateAsync: cancelGroupMutation } = useCancelGroupMutation();
  const { mutateAsync: callGroupMutation } = useCallGroupMutation();
  const { mutateAsync: completeGroupMutation } = useCompleteGroupMutation();

  if (isGroupsLoading || !groups) {
    return <>웨이팅 목록을 불러오는 중이에요.</>;
  }

  const activatedGroups = groups.filter(({ status }) => {
    if (activatedTab === "active") {
      return status === "RESERVED" || status === "CALLED";
    } else if (activatedTab === "completed") {
      return status === "COMPLETED";
    } else if (activatedTab === "canceled") {
      return status === "CANCELED" || status === "NOSHOW";
    }
  });

  const isActivatedTabEmpty = activatedGroups.length === 0;

  const activatedGroupItems = activatedGroups.map(
    ({ waitingId, status, updatedAt, ...props }) => (
      <GroupItem
        {...props}
        status={activatedTab}
        id={waitingId}
        key={waitingId}
        actionSlot={
          (activatedTab === "active" && (
            <div className="flex space-x-2">
              <CancelButton
                onCancel={async () => {
                  try {
                    const { code } = await cancelGroupMutation({
                      waitingId,
                    });
                    if (code === StatusCode.NotFound.toString()) {
                      alert("손님이 이미 취소한 웨이팅이에요.");
                    }
                    await refetchGroups();
                  } catch (error) {
                    alert("에러가 발생하였습니다. 잠시후 다시 시도해주세요.");
                  }
                }}
              />
              {status === "RESERVED" && (
                <NotifyButton
                  onNotify={async () => {
                    try {
                      const { code } = await callGroupMutation({
                        waitingId,
                      });
                      if (code === StatusCode.NotFound.toString()) {
                        alert("손님이 이미 취소한 웨이팅이에요.");
                        return;
                      }
                      await refetchGroups();
                    } catch (error) {
                      alert("에러가 발생하였습니다. 잠시후 다시 시도해주세요.");
                    }
                  }}
                />
              )}
              {status === "CALLED" && (
                <EnterButton
                  onEnter={async () => {
                    try {
                      const { code } = await completeGroupMutation({
                        waitingId,
                      });
                      if (code === StatusCode.NotFound.toString()) {
                        alert("손님이 이미 취소한 웨이팅이에요.");
                        return;
                      }
                      await refetchGroups();
                    } catch (error) {
                      alert("에러가 발생하였습니다. 잠시후 다시 시도해주세요.");
                    }
                  }}
                />
              )}
            </div>
          )) ||
          (activatedTab === "canceled" && (
            <div className="flex space-x-2 text-sm">
              <div>취소/부재</div>
              <div className="font-bold">{formatDateString(updatedAt)}</div>
            </div>
          )) ||
          (activatedTab === "completed" && (
            <div className="flex space-x-2 text-sm">
              <div>입장 시각</div>
              <div className="font-bold">{formatDateString(updatedAt)}</div>
            </div>
          ))
        }
      />
    ),
  );

  const groupCountRow = (
    <li>
      <p className="py-4 text-xs">총 {activatedGroups.length}팀</p>
    </li>
  );

  const handleToggle = (updatedTab: "active" | "completed" | "canceled") => {
    setActivatedTab(updatedTab);
  };

  return (
    <QueueTabsContainer
      tabSlot={
        <QueueTabs activatedTab={activatedTab} onToggle={handleToggle} />
      }
      groupSlot={
        isActivatedTabEmpty ? (
          <div className="flex flex-auto items-center justify-center">
            비어있어요.
          </div>
        ) : (
          <>
            {groupCountRow}
            {activatedGroupItems}
          </>
        )
      }
    />
  );
}
