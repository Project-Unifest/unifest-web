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
  ForbiddenError,
} from "@/src/shared/api/errors";
import { FallbackProps } from "react-error-boundary";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { useRecoverFromError } from "@/src/app/model/useRecoverFromError";
export const GlobalErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { recoverFromError } = useRecoverFromError();

  const handleClick = () => {
    const resetOptions = (error as { resetOptions?: ResetOptions })
      .resetOptions || {
      shouldClearCache: true,
    };
    recoverFromError(resetOptions);
  };

  useEffect(() => {
    const resetOptions = (error as { resetOptions?: ResetOptions })
      .resetOptions || {
      shouldClearCache: true,
    };
    match(error)
      .with(P.instanceOf(UnauthorizedError), () => {
        if (pathname !== "/sign-in" && pathname !== "/sign-up") {
          router.push("/sign-in?redirect=" + pathname);
        } else {
          recoverFromError(resetOptions);
          resetErrorBoundary();
        }
      })
      .with(P.instanceOf(ForbiddenError), () => {
        recoverFromError(resetOptions);
        if (pathname !== "/sign-in" && pathname !== "/sign-up") {
          router.push("/sign-in?redirect=" + pathname);
        } else {
          recoverFromError(resetOptions);
          resetErrorBoundary();
        }
      })
      .with(P.instanceOf(NetworkError), () => {
        router.push("/sign-in");
      });
  }, [error, pathname, recoverFromError, resetErrorBoundary, router]);

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
    .with(P.instanceOf(ForbiddenError), () => ({
      icon: "🔒",
      title: "로그인이 필요해요",
      message: error.message,
      action: {
        label: "확인",
        onClick: handleClick,
      },
    }))
    .with(P.instanceOf(TimeoutError), () => ({
      icon: "⏳",
      title: "요청 시간 초과",
      message: error.message,
      action: {
        label: "새로고침",
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
