import { HTTPError, NormalizedOptions, Options } from "ky";

export class BadRequestError extends HTTPError {
  constructor(
    response: Response,
    request: Request,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "BadRequestError";
    this.message = "⚠️ 잘못된 요청입니다. 입력한 정보를 다시 확인해주세요.";
  }
}

export class UnauthorizedError extends HTTPError {
  constructor(
    response: Response,
    request: Request,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "UnauthorizedError";
    this.message = "🔑 로그인 후 이용해주세요.";
  }
}

export class ForbiddenError extends HTTPError {
  constructor(
    response: Response,
    request: Request,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "ForbiddenError";
    this.message = "🚫 접근 권한이 없습니다.";
  }
}

export class NotFoundError extends HTTPError {
  constructor(
    response: Response,
    request: Request,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "NotFoundError";
    this.message = "🔍 요청하신 정보를 찾을 수 없습니다.";
  }
}

export class TooManyRequestsError extends HTTPError {
  constructor(
    response: Response,
    request: Request,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "TooManyRequestsError";
    this.message = "⏳ 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  }
}

export class InternalServerError extends HTTPError {
  constructor(
    response: Response,
    request: Request,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "InternalServerError";
    this.message = "🛠 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
}

export class ServiceUnavailableError extends HTTPError {
  constructor(
    response: Response,
    request: Request,
    options: NormalizedOptions,
  ) {
    super(response, request, options);
    this.name = "ServiceUnavailableError";
    this.message = "🏗️ 현재 서버 점검 중입니다. 잠시 후 다시 이용해주세요.";
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
    this.message =
      "🌐 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
}
