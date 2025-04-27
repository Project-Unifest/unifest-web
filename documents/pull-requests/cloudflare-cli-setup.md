## Summary

Cloudflare Pages CLI를 사용한 개발 환경을 구성했습니다. 이를 통해 로컬 개발 환경에서도 Cloudflare의 서비스들을 사용할 수 있으며, 배포 프로세스를 자동화할 수 있습니다.

## PR 유형 및 세부 작업 내용

- [x] 빌드 부분 혹은 패키지 매니저 수정
- [x] 코드 리팩토링

세부 내용:

1. Cloudflare Pages 개발 환경 설정

   - `next.config.mjs`에 Cloudflare 개발 플랫폼 설정 추가
   - `wrangler.toml` 설정 파일 추가
   - ESLint 플러그인 적용 (`eslint-plugin-next-on-pages`)

2. 패키지 및 스크립트 추가
   - `@cloudflare/next-on-pages` 패키지 추가
   - 필수 peer 의존성 추가:
     - `wrangler`
     - `vercel`
     - `@tanstack/query-core`
     - `webpack`
     - `prettier`
   - `@tanstack/react-query` 버전 업데이트 (^5.72.2)
   - `pages:build`, `preview`, `deploy` 스크립트 추가

## 작동 방식

1. 로컬 개발 환경

   - `npm run preview`: 로컬에서 Cloudflare Workers 환경으로 앱 실행
   - Cloudflare 서비스(KV, D1, R2 등) 접근 가능

2. 배포
   - `npm run deploy`: Cloudflare Pages에 직접 배포
   - GitHub 연동 시 자동 배포도 가능

## 주의사항

- 환경 변수는 wrangler.toml에 명시 가능하고, 시크릿은 반드시 Cloudflare Pages의 Environment Variables에서 관리하거나 'wrangler secret' 명령어를 사용해야 함
- ESLint를 통해 Cloudflare Pages 호환성 검사 가능

## 설치 및 빌드 요구사항

다음 의존성들이 반드시 설치되어 있어야 합니다:

```bash
yarn add -D wrangler vercel @tanstack/query-core webpack prettier
yarn up @tanstack/react-query@^5.72.2
```
