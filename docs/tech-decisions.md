# DTO / Mapper 분리

## 배경

Prisma ORM의 Model 객체를 그대로 API 응답으로 반환할 경우
DB 스키마와 API 응답이 강하게 결합되는 문제가 있다.

## 문제

- passwordHash 같은 민감 정보 노출 가능성
- API Response 변경 시 DB Model 영향 가능성
- 응답 스펙 관리 어려움

## 결정

Prisma Model을 직접 반환하지 않고
mapper 함수를 통해 Response DTO로 변환한다.

구조:

Prisma Model
→ mapper
→ Response DTO

## 결과

- 민감 정보 노출 방지
- API Response와 DB 구조 분리
- 유지보수성 향상