## Summary

부스 관리 기능의 쿼리 무효화(invalidation) 로직을 수정하여 데이터 일관성을 개선하였습니다. 특히 부스 스케줄 업데이트 시 적절한 쿼리키가 무효화되도록 수정하였으며, 메뉴 아이템 업로드 완료를 기다리도록 개선하였습니다.

## Background

react query의 Mutation은 기본적으로 cache validation이 끝날 때까지 기다려주지 않습니다:

```tsx
{
  // 🎉 will wait for query invalidation to finish
  onSuccess: () => {
    return queryClient.invalidateQueries({
      queryKey: ["posts", id, "comments"],
    });
  };
}
{
  // 🚀 fire and forget - will not wait
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["posts", id, "comments"],
    });
  };
}
```

참고: https://tkdodo.eu/blog/mastering-mutations-in-react-query

## 시나리오

- Given: Add.tsx가 있다.
- When: 스케줄 생성 요청 / 메뉴을 하고 navigate 된다.
- Then: 홈 화면으로 넘어간다. 이 때, cache invalidation이 제대로 이루어지지 않았기 때문에 menu 배열은 비어있게 된다.

## PR 유형 및 세부 작업 내용

- [x] 버그 수정
- [x] 코드 리팩토링

### 버그 수정 목록

1. 자동저장 로직 관련 버그

   - 문제: 서버에서 메뉴 아이템 생성 시 에러가 발생하면 메뉴 아이템이 boothDetailStore에 항상 남아있고, 클라이언트에서 임의로 생성한 id로 인해 삭제도 불가능
   - 해결: useCreateBooth에서 boothDetailStore와 boothDetailDraftStore를 reset하도록 수정

2. 부스 중복 생성 버그

   - 문제: 상세히 생성할 때 빈 부스가 하나씩 더 생성되어 사용자가 수동으로 삭제해야 함
   - 해결: Add.tsx에서 addBooth 대신 editBooth를 사용하도록 변경

3. UI 상태 불안정 버그

   - 문제: 상세히 생성할 때 부스의 텍스트, 이미지가 무작위로 여러번 바뀌다가 home page로 navigate됨
   - 해결: router.push() 호출을 단일화하여 안정적인 네비게이션 처리

4. 쿼리 캐시 무효화 누락
   - 문제: 상세히 생성할 때 query cache를 invalidate하지 않고 API 함수를 직접 사용
   - 해결: editBooth() API 함수 대신 react query의 useUpdateBooth()를 사용하고 적절한 query key invalidate 처리

### 개선 사항

1. 부스 스케줄 업데이트 시 올바른 쿼리키 무효화 적용

   - `boothKeys.list.queryKey`와 `memberKeys.me.queryKey` 모두 무효화하도록 수정
   - 캐시 무효화가 완료될 때까지 대기하도록 개선
   - invalidateQueries를 return하여 mutation 완료까지 대기

2. 메뉴 아이템 업로드 프로세스 개선
   - 모든 메뉴 아이템 업로드가 완료될 때까지 대기하도록 수정
   - 업로드 완료 후 네비게이션 처리

## 테스트 완료 여부

- [x] 부스 스케줄 업데이트 후 데이터 갱신 확인
- [x] 메뉴 아이템 업로드 완료 후 정상 동작 확인
- [x] 자동저장 로직 제거 후 정상 동작 확인
- [x] 부스 생성 시 중복 생성 버그 수정 확인
- [x] UI 상태 변경 및 네비게이션 안정성 확인

## 리뷰 요구사항

- 쿼리 무효화 순서의 적절성 검토
- 캐시 무효화 대기 로직 검토
- Store reset 로직 검토
- 네비게이션 처리 로직 검토
