"use client";

import { match, P } from "ts-pattern";
import {
  UnauthorizedError,
  NetworkError,
  ServerError,
  ServiceUnavailableError,
  TimeoutError,
  ValidationError,
  ResetOptions,
} from "@/src/shared/api/errors";
import { FallbackProps } from "react-error-boundary";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const GlobalErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const router = useRouter();

  const handleClick = () => {
    const resetOptions = (error as { resetOptions?: ResetOptions })
      .resetOptions || {
      shouldClearCache: true,
    };
    resetErrorBoundary(resetOptions);
  };

  useEffect(() => {
    console.log(error);
    match(error)
      .with(P.instanceOf(UnauthorizedError), () => {
        router.push("/sign-in");
        resetErrorBoundary();
      })
      .with(P.instanceOf(NetworkError), () => {
        router.push("/sign-in");
      });
  }, [error, resetErrorBoundary, router]);

  const { icon, title, message, action } = match(error)
    .with(P.instanceOf(UnauthorizedError), () => ({
      icon: "🔒",
      title: "로그인이 필요해요",
      message: error.message,
      action: {
        label: "로그인하러 가기",
        onClick: handleClick,
      },
    }))
    .with(P.instanceOf(NetworkError), () => ({
      icon: "📶",
      title: "연결 실패",
      message: error.message,
      action: {
        label: "다시 시도",
        onClick: handleClick,
      },
    }))
    .with(
      P.instanceOf(ServerError),
      P.instanceOf(ServiceUnavailableError),
      () => ({
        icon: "🔧",
        title: "서버 오류",
        message: error.message,
        action: {
          label: "새로고침",
          onClick: handleClick,
        },
      }),
    )
    .with(P.instanceOf(TimeoutError), () => ({
      icon: "⏳",
      title: "요청 시간 초과",
      message: error.message,
      action: {
        label: "다시 시도",
        onClick: handleClick,
      },
    }))
    .with(P.instanceOf(ValidationError), () => ({
      icon: "📝",
      title: "입력값 오류",
      message: error.message,
      action: {
        label: "확인",
        onClick: handleClick,
      },
    }))
    .otherwise(() => ({
      icon: "😥",
      title: "오류가 발생했어요",
      message: error.message,
      action: {
        label: "다시 시도",
        onClick: handleClick,
      },
    }));

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-center">
        <span className="text-4xl">{icon}</span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="text-sm opacity-70">{message}</p>
      <button
        className="rounded-md bg-blue-500 px-4 py-3"
        onClick={action.onClick}
      >
        <span className="text-sm font-bold text-white">{action.label}</span>
      </button>
    </div>
  );
};
