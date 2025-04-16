# Fetch API를 Ky 클라이언트로 교체

## 개요

현재 사용 중인 raw fetch() 메서드를 ky 클라이언트로 교체하여 API 통신 로직을 개선합니다.

## 변경사항

### 기존 문제점 (AS-IS)

1. Data fetching 함수마다 반복되는 직렬화 작업
   - Request body의 stringify
   - Response body의 json()
2. 중복되는 헤더 설정
   - Authorization
   - Content-type
3. Error 처리 미흡
   - Network Error, HTTP Error, Runtime Error 구분 없음
4. useAuthFetch() hook 사용의 비효율
   - Bearer token 사용을 위한 중복 코드 발생

### 개선사항 (TO-BE)

1. ky 클라이언트 도입

   - Zustand store 연동으로 bearer token 자동 설정
   - Silent refresh 구현 (access token 만료 시 자동 갱신)

2. 구현된 기능

   - 중앙화된 인증 토큰 관리
   - 자동 토큰 갱신
   - 일관된 에러 처리
   - 타입 안전성 강화

3. 변경된 파일들
   - API 클라이언트 설정: `src/shared/api/client.ts`
   - 인증 관련 API: `src/features/auth/model/auth.ts`
   - 부스 관련 API:
     - `src/entities/booth/api/boothList.ts`
     - `src/entities/booth/api/boothDetail.ts`
     - `src/features/booth/api/addBooth.ts`
   - 큐 관련 API:
     - `src/widgets/queue/api/index.ts`
     - `src/features/queue/api/queue.ts`
   - 메뉴 관련 API: `src/features/menu/model/menu.ts`

## 도입 이유

### Ky의 장점

1. Next.js 마이그레이션 용이성

   - fetch() API 기반으로 로직 재사용 가능

2. 풍부한 기능 지원

   - Instance creation
   - Interceptors
   - Error handling
   - Request/response body serialization

3. 자동 retry 지원
   - Response 상태 코드 기반 retry 기능

### Ky의 한계

1. multipart/form-data 요청 시 upload progress 확인 불가
   - fetch API의 제한사항으로 인한 한계

## 주요 변경 사례

### 1. API 클라이언트 설정

```typescript
// src/shared/api/client.ts
export const client = ky.create({
  prefixUrl: API_URL,
  hooks: {
    beforeRequest: [
      // Bearer 토큰 자동 설정
    ],
    afterResponse: [
      // 토큰 만료 시 자동 갱신
    ],
  },
});
```

### 2. API 호출 패턴 변경

```typescript
// AS-IS
const response = await fetch(`${API_URL}/api/endpoint`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
const result = await response.json();

// TO-BE
const result = await client
  .post("api/endpoint", {
    json: data,
  })
  .json();
```

## 마이그레이션 효과

1. 코드 품질 향상

   - 반복적인 보일러플레이트 제거
   - 타입 안전성 강화
   - 일관된 에러 처리

2. 유지보수성 향상

   - API 통신 로직 중앙화
   - 인증 처리 자동화
   - 일관된 코드 패턴

3. 개발 생산성 향상
   - 간결한 API 호출 구문
   - 자동화된 에러 처리
   - 타입 추론 강화
