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

export default function Queue() {
  const [activatedTab, setActivatedTab] = useState<string>("active");
  const params = useParams<{ boothId: string }>()!;
  const boothId = parseInt(params.boothId);
  const [groups, setGroups] = useState<QueueGroup[] | undefined>();

  useEffect(() => {
    const getQueue = async () => {
      const response = await fetch(`${API_URL}/waiting/${boothId}/all`);
      const data = await response.json();
      setGroups(data);
    };

    console.log(API_URL);
    console.log(process.env.API_URL);
    console.log(process.env.NEXT_PUBLIC_API_URL);

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
    ({ waitingId, status, ...props }) => (
      <GroupItem
        {...props}
        id={waitingId}
        key={waitingId}
        actionSlot={
          activatedTab === "active" && (
            <div className="flex space-x-2">
              <CancelButton
                id={waitingId}
                onCancel={async (id: number) => {
                  try {
                    await fetch(`${API_URL}/waiting/${id}`, {
                      method: HTTPMethod.DELETE,
                    });
                    setGroups((currentGroups) =>
                      currentGroups?.map((currentGroup) => {
                        if (currentGroup.waitingId === id) {
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
                      await fetch(`${API_URL}/waiting/call/${id}`, {
                        method: HTTPMethod.PUT,
                      });
                      setGroups((currentGroups) =>
                        currentGroups?.map((currentGroup) => {
                          if (currentGroup.waitingId === id) {
                            return { ...currentGroup, status: "CALLED" };
                          }
                          return currentGroup;
                        }),
                      );
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
                      setGroups((currentGroups) =>
                        currentGroups?.map((currentGroup) => {
                          if (currentGroup.waitingId === id) {
                            return { ...currentGroup, status: "COMPLETED" };
                          }
                          return currentGroup;
                        }),
                      );
                    } catch (error) {
                      alert("에러가 발생하였습니다. 잠시후 다시 시도해주세요.");
                    }
                  }}
                />
              )}
            </div>
          )
        }
      />
    ),
  );

  const groupCountRow = (
    <li>
      <p className="py-4">총 {activatedGroups.length}팀</p>
    </li>
  );

  const handleToggle = (updatedTab: string) => {
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
