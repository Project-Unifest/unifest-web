"use client";
import React, { useEffect, useState } from "react";
import QueueTabsContainer from "@/src/entities/queue/ui/QueueTabsContainer";
import QueueTabs from "@/src/features/queue/ui/QueueTabs";
import NotifyButton from "@/src/features/queue/ui/NotifyButton";
import CancelButton from "@/src/features/queue/ui/CancelButton";
import GroupItem from "@/src/entities/queue/ui/GroupItem";
import Enter from "@/src/features/queue/ui/EnterButton";
import { useParams } from "next/navigation";
import { API_URL, HTTPMethod } from "@/src/shared/api/config";
import { QueueGroup } from "@/src/shared/lib/types";
import EnterButton from "@/src/features/queue/ui/EnterButton";
import { formatDateString } from "../lib/formatDateString";
import useAuthFetch from "@/src/shared/model/auth/useAuthFetchList";
import { issuePIN } from "../api";

export default function Queue() {
  const [activatedTab, setActivatedTab] = useState<
    "active" | "completed" | "canceled"
  >("active");
  const params = useParams<{ boothId: string }>()!;
  const boothId = parseInt(params.boothId);
  const [groups, setGroups] = useState<QueueGroup[] | undefined>();

  const authIssuePIN = useAuthFetch(issuePIN);

  const getQueue = async () => {
    const data = await authIssuePIN(boothId);
    console.log(data);
    setGroups(data);
  };

  useEffect(() => {
    getQueue();
  }, [boothId]);

  if (!groups) {
    return <>웨이팅 목록을 불러오는 중이에요.</>;
  }

  const activatedGroups = groups.filter(({ status }) => {
    if (activatedTab === "active") {
      return status === "RESERVED" || status === "CALLED";
    } else if (activatedTab === "completed") {
      return status === "COMPLETED";
    } else if (activatedTab === "canceled") {
      return status === "CANCELED";
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
                    // await fetch(`${API_URL}/waiting/${id}`, {
                    //   method: HTTPMethod.DELETE,
                    // });
                    setGroups((currentGroups) =>
                      currentGroups?.map((currentGroup) => {
                        if (currentGroup.waitingId === waitingId) {
                          return { ...currentGroup, status: "CANCELED" };
                        }
                        return currentGroup;
                      }),
                    );
                  } catch (error) {
                    alert("에러가 발생하였습니다. 잠시후 다시 시도해주세요.");
                  }
                }}
              />
              {status === "RESERVED" && (
                <NotifyButton
                  id={waitingId}
                  onNotify={async (id: number) => {
                    try {
                      const response = await fetch(
                        `${API_URL}/waiting/${id}/call`,
                        {
                          method: HTTPMethod.PUT,
                        },
                      );
                      await getQueue();
                    } catch (error) {
                      alert("에러가 발생하였습니다. 잠시후 다시 시도해주세요.");
                    }
                  }}
                />
              )}
              {status === "CALLED" && (
                <EnterButton
                  id={waitingId}
                  onEnter={async (id: number) => {
                    try {
                      // TODO invoke api call to update the server
                      const response = await fetch(
                        `${API_URL}/waiting/${id}/complete`,
                        {
                          method: HTTPMethod.PUT,
                        },
                      );
                      await getQueue();
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
