import {
  HTTPError,
  type NormalizedOptions,
  type KyResponse,
  type KyRequest,
} from "ky";
import { Route } from "next/types";

export interface ResetOptions {
  shouldClearCache?: boolean;
  shouldClearAuth?: boolean;
  shouldClearNavigation?: boolean;
  navigationTarget?: Route;
}

export class UnauthorizedError extends HTTPError {
  resetOptions: ResetOptions;

  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "UnauthorizedError";
    this.message = "로그인이 필요한 서비스예요";
    this.resetOptions = {
      shouldClearCache: true,
      shouldClearAuth: true,
      shouldClearNavigation: true,
      navigationTarget: "/login",
    };
  }
}

export class ForbiddenError extends HTTPError {
  resetOptions: ResetOptions;

  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "ForbiddenError";
    this.message = "접근 권한이 없어요";
    this.resetOptions = {
      shouldClearCache: true,
      shouldClearAuth: true,
      shouldClearNavigation: true,
      navigationTarget: "/sign-in",
    };
  }
}

export class NotFoundError extends HTTPError {
  resetOptions: ResetOptions;

  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "NotFoundError";
    this.message = "요청하신 정보를 찾을 수 없어요";
    this.resetOptions = {
      shouldClearCache: true,
      shouldClearAuth: false,
      shouldClearNavigation: false,
    };
  }
}

export class ConflictError extends HTTPError {
  resetOptions: ResetOptions;

  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "ConflictError";
    this.message = "요청하신 작업을 수행할 수 없어요";
    this.resetOptions = {
      shouldClearCache: true,
      shouldClearAuth: false,
      shouldClearNavigation: false,
    };
  }
}

export class BadRequestError extends HTTPError {
  resetOptions: ResetOptions;

  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "BadRequestError";
    this.message = "잘못된 요청이에요.";
    this.resetOptions = {
      shouldClearCache: false,
      shouldClearAuth: false,
      shouldClearNavigation: true,
      navigationTarget: "/",
    };
  }
}

export class ValidationError extends HTTPError {
  resetOptions: ResetOptions;

  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "ValidationError";
    this.message = "입력하신 정보를 다시 확인해주세요";
    this.resetOptions = {
      shouldClearCache: false,
      shouldClearAuth: false,
      shouldClearNavigation: false,
    };
  }
}

export class ServerError extends HTTPError {
  resetOptions: ResetOptions;

  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "ServerError";
    this.message = "일시적인 서버 오류가 발생했어요. 잠시 후 다시 시도해주세요";
    this.resetOptions = {
      shouldClearCache: true,
      shouldClearAuth: false,
      shouldClearNavigation: false,
    };
  }
}

export class ServiceUnavailableError extends HTTPError {
  resetOptions: ResetOptions;

  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "ServiceUnavailableError";
    this.message = "현재 서비스 점검 중이에요. 잠시 후 다시 시도해주세요";
    this.resetOptions = {
      shouldClearCache: true,
      shouldClearAuth: false,
      shouldClearNavigation: false,
    };
  }
}

export class NetworkError extends Error {
  resetOptions: ResetOptions;

  constructor() {
    super("인터넷 연결을 확인해주세요");
    this.name = "NetworkError";
    this.resetOptions = {
      shouldClearCache: true,
      shouldClearAuth: false,
      shouldClearNavigation: false,
    };
  }
}

export class TimeoutError extends Error {
  resetOptions: ResetOptions;

  constructor() {
    super("요청 시간이 초과되었어요. 다시 시도해주세요");
    this.name = "TimeoutError";
    this.resetOptions = {
      shouldClearCache: true,
      shouldClearAuth: false,
      shouldClearNavigation: false,
    };
  }
}
