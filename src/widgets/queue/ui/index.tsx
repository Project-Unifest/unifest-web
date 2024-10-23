"use client";
import React, { useCallback, useEffect, useState } from "react";
import QueueTabsContainer from "@/src/entities/queue/ui/QueueTabsContainer";
import QueueTabs from "@/src/features/queue/ui/QueueTabs";
import NotifyButton from "@/src/features/queue/ui/NotifyButton";
import CancelButton from "@/src/features/queue/ui/CancelButton";
import GroupItem from "@/src/entities/queue/ui/GroupItem";
import { useParams } from "next/navigation";
import { API_URL, HTTPMethod } from "@/src/shared/api/config";
import { QueueGroup } from "@/src/shared/lib/types";
import EnterButton from "@/src/features/queue/ui/EnterButton";
import { formatDateString } from "../lib/formatDateString";
import useAuthFetch from "@/src/shared/model/auth/useAuthFetchList";
import { fetchGroups } from "../api";
import { cancelGroup } from "@/src/features/queue/api/queue";
import useRequireAuth, {
  AuthType,
} from "@/src/shared/model/auth/useRequireAuth";
import useImmediateIntervalAsyncTask from "../model/useImmediateIntervalAsyncTask";
import useIntervalAsyncTask from "../model/useAsyncIntervalTask";

export default function Queue() {
  const [activatedTab, setActivatedTab] = useState<
    "active" | "completed" | "canceled"
  >("active");
  const params = useParams<{ boothId: string }>()!;
  const boothId = parseInt(params.boothId);

  const authFetchGroups = useAuthFetch(fetchGroups);
  const authCancelGroup = useAuthFetch(cancelGroup);

  const isAuthLoading = useRequireAuth(AuthType.MEMBER);

  const loadGroups = useCallback(async () => {
    if (!isAuthLoading) {
      const data = await authFetchGroups(boothId);
      return data;
    }
  }, [authFetchGroups, boothId, isAuthLoading]);

  const [groups, setGroups, reloadGroups] = useImmediateIntervalAsyncTask<
    QueueGroup[]
  >(loadGroups, 10000, !isAuthLoading);

  if (!groups || isAuthLoading) {
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
                    const { code } = await authCancelGroup(waitingId);
                    if (code === 500) {
                      alert("실패");
                    }
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
                  onNotify={async () => {
                    try {
                      const response = await fetch(
                        `${API_URL}/waiting/${waitingId}/call`,
                        {
                          method: HTTPMethod.PUT,
                        },
                      );
                      await reloadGroups();
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
                      // TODO invoke api call to update the server
                      const response = await fetch(
                        `${API_URL}/waiting/${waitingId}/complete`,
                        {
                          method: HTTPMethod.PUT,
                        },
                      );
                      await reloadGroups();
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
