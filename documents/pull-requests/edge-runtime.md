## Summary

Next.js 애플리케이션의 성능 향상을 위해 Edge Runtime을 활성화했습니다. 이를 통해 사용자와 더 가까운 위치에서 애플리케이션이 실행되어 더 빠른 응답 시간을 제공할 수 있습니다.

참고 문서: [Cloudflare Pages - Next.js Edge Runtime](https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/get-started/#4-ensure-all-server-rendered-routes-use-the-edge-runtime)

## PR 유형 및 세부 작업 내용

- [x] 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경)
- [x] 코드 리팩토링

세부 내용:

1. `app/layout.tsx` 파일에 Edge Runtime 설정 추가
   - `export const runtime = "edge"` 설정을 통해 Edge Runtime 활성화
   - 전체 애플리케이션이 Edge Runtime에서 실행되도록 설정
   - Next.js의 서버 렌더링 라우트는 반드시 Edge Runtime을 사용해야 함 (API 라우트나 getServerSideProps를 사용하는 페이지 포함)

## 기대 효과

1. 성능 향상

   - 사용자와 가까운 위치에서 애플리케이션 실행
   - 더 빠른 응답 시간 제공
   - 글로벌 사용자에 대한 일관된 성능 제공

2. 비용 최적화
   - 서버리스 실행으로 인한 인프라 비용 절감
   - 자동 스케일링을 통한 효율적인 리소스 사용

## 주의사항

Next.js는 "Edge"와 "Node.js" 두 가지 런타임을 제공하지만, Cloudflare에서는 현재 "Edge" 런타임만 사용 가능합니다. 따라서 모든 서버 렌더링 라우트(API 라우트, getServerSideProps를 사용하는 페이지 등)는 반드시 Edge 런타임을 사용하도록 설정해야 합니다.
