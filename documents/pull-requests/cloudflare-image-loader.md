## Summary

Cloudflare의 이미지 최적화 기능을 활용하기 위해 Next.js의 이미지 로더를 Cloudflare의 커스텀 이미지 로더로 변경했습니다.

## PR 유형 및 세부 작업 내용

- [x] 코드 리팩토링

세부 내용:

1. `imageLoader.ts` 파일 추가

   - Cloudflare의 이미지 최적화 API를 사용하는 커스텀 이미지 로더 구현
   - 개발 환경에서는 기본 이미지 URL 사용
   - 프로덕션 환경에서는 Cloudflare CDN을 통한 이미지 최적화 적용

2. `next.config.mjs` 수정
   - 기존 remotePatterns 설정 제거
   - 커스텀 이미지 로더 설정 추가

## 작동 방식

1. 개발 환경(`NODE_ENV === "development"`)

   - 기존 이미지 URL을 그대로 사용
   - 이미지 최적화 없이 직접 서빙

2. 프로덕션 환경
   - Cloudflare의 이미지 최적화 API 사용
   - `/cdn-cgi/image/` 경로를 통해 이미지 최적화 적용
   - width와 quality 파라미터를 통한 이미지 최적화 지원
