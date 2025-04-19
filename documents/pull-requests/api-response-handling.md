## Summary

API 응답 처리 로직을 개선하고 React Query를 도입하여 데이터 fetching 및 캐싱을 관리하도록 변경했습니다. 또한 인증 관련 로직을 개선하고 테스트 코드를 추가했습니다.

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가

  - React Query 도입으로 데이터 fetching 및 캐싱 관리 개선
  - API 응답 타입 검증 강화
  - 토큰 검증 테스트 추가

- [x] 코드 리팩토링

  - API 호출 로직을 React Query hooks로 중앙화
  - 인증 관련 로직을 React Query hooks로 마이그레이션
  - 불필요한 provider 제거 및 store 구조 개선

- [x] 테스트 추가, 테스트 리팩토링
  - 토큰 검증 테스트 추가
  - API 응답 처리 테스트 추가

## test 완료 여부

- [x] 토큰 검증 테스트
- [x] API 응답 처리 테스트
- [x] React Query hooks 테스트

## 리뷰 요구사항

1. React Query 도입이 적절한지 검토
2. API 응답 처리 로직이 올바르게 구현되었는지 확인
3. 테스트 코드가 충분한지 검토
