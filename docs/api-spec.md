# API Spec

RunPilot API는 NestJS 기반 REST API입니다.

## Base URL

```text
http://localhost:3001
```

## Swagger

```text
http://localhost:3001/docs
```

## Common Response

성공 응답은 Global `ResponseInterceptor`를 통해 다음 형식으로 감싸집니다.

```json
{
  "success": true,
  "data": {}
}
```

실패 응답은 Global `HttpExceptionFilter`를 통해 다음 형식으로 반환됩니다.

```json
{
  "success": false,
  "statusCode": 400,
  "message": "error message"
}
```

## Authentication

보호 API는 JWT Bearer Token을 사용합니다.

```http
Authorization: Bearer <accessToken>
```

---

## Health

### GET /

API 기본 상태를 반환합니다.

Response `data`:

```json
{
  "name": "RunPilot",
  "message": "RunPilot API is running"
}
```

### GET /health

헬스 체크 응답을 반환합니다.

Response `data`:

```json
{
  "status": "ok",
  "service": "api"
}
```

---

## Auth

### POST /auth/signup

이메일과 비밀번호로 회원가입하고 JWT accessToken을 발급합니다.

Request:

```json
{
  "email": "runner@example.com",
  "password": "password123",
  "nickname": "runner"
}
```

`nickname`은 선택 값입니다.

Response `data`:

```json
{
  "accessToken": "jwt-access-token"
}
```

이미 사용 중인 이메일 또는 닉네임이면 `409 Conflict`를 반환합니다.

### POST /auth/login

이메일과 비밀번호로 로그인하고 JWT accessToken을 발급합니다.

Request:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Response `data`:

```json
{
  "accessToken": "jwt-access-token"
}
```

### GET /auth/me

현재 로그인한 사용자 정보를 반환합니다.

Auth: Required

Response `data`:

```json
{
  "userId": 1,
  "email": "test@example.com"
}
```

---

## Running Records

러닝 기록 API는 모두 인증이 필요합니다.

### POST /running-records

러닝 기록을 생성합니다.

Auth: Required

Request:

```json
{
  "runDate": "2026-05-14",
  "distanceKm": 5.2,
  "durationSeconds": 1800,
  "memo": "가볍게 조깅 완료"
}
```

Response `data`:

```json
{
  "id": 1,
  "runDate": "2026-05-14T00:00:00.000Z",
  "distanceKm": 5.2,
  "durationSeconds": 1800,
  "paceSecPerKm": 346,
  "memo": "가볍게 조깅 완료",
  "createAt": "2026-05-14T00:00:00.000Z",
  "updateAt": "2026-05-14T00:00:00.000Z"
}
```

### GET /running-records/me

내 러닝 기록 목록을 조회합니다.

Auth: Required

Query:

```text
page=1
limit=20
```

Response `data`:

```json
{
  "items": [
    {
      "id": 1,
      "runDate": "2026-05-14T00:00:00.000Z",
      "distanceKm": 5.2,
      "durationSeconds": 1800,
      "paceSecPerKm": 346,
      "memo": "가볍게 조깅 완료",
      "createAt": "2026-05-14T00:00:00.000Z",
      "updateAt": "2026-05-14T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

### PATCH /running-records/:id

내 러닝 기록을 수정합니다.

Auth: Required

Request:

```json
{
  "runDate": "2026-05-15",
  "distanceKm": 6,
  "durationSeconds": 2100,
  "memo": "거리 증가"
}
```

### DELETE /running-records/:id

내 러닝 기록을 삭제합니다.

Auth: Required

Response `data`:

```json
{
  "deleted": true
}
```

---

## Runner Profile

러너 프로필 API는 모두 인증이 필요합니다.

### GET /runner-profile/me

내 기본 러닝 프로필을 조회합니다. 아직 프로필이 없으면 `data`는 `null`입니다.

Auth: Required

Response `data`:

```json
{
  "id": 1,
  "experienceLevel": "BEGINNER",
  "weeklyRunCount": 3,
  "comfortableDistanceKm": 5,
  "goal": "10km 완주",
  "planStartDate": "2026-06-15T00:00:00.000Z",
  "preferredTrainingDays": ["MONDAY", "WEDNESDAY", "SATURDAY"],
  "createdAt": "2026-06-11T00:00:00.000Z",
  "updatedAt": "2026-06-11T00:00:00.000Z"
}
```

### PUT /runner-profile/me

내 기본 러닝 프로필을 생성하거나 수정합니다.

Auth: Required

Request:

```json
{
  "experienceLevel": "BEGINNER",
  "weeklyRunCount": 3,
  "comfortableDistanceKm": 5,
  "goal": "10km 완주",
  "planStartDate": "2026-06-15",
  "preferredTrainingDays": ["MONDAY", "WEDNESDAY", "SATURDAY"]
}
```

Response `data`: `RunnerProfile`

---

## Training Plans

훈련 계획 API는 모두 인증이 필요합니다.

### POST /training-plans/generate

최근 러닝 기록을 기반으로 Rule-Based 훈련 계획을 생성합니다.

Auth: Required

Request:

```json
{
  "goal": "10km 완주 준비"
}
```

`goal`은 선택 값입니다.

Response `data`:

```json
{
  "id": 1,
  "title": "10km 완주 준비",
  "goalType": "GENERAL",
  "level": "INTERMEDIATE",
  "startDate": "2026-05-14T00:00:00.000Z",
  "endDate": "2026-05-20T00:00:00.000Z",
  "sourceType": "RULE_BASED",
  "createdAt": "2026-05-14T00:00:00.000Z",
  "updatedAt": "2026-05-14T00:00:00.000Z",
  "items": [
    {
      "id": 1,
      "planDate": "2026-05-15T00:00:00.000Z",
      "workoutType": "EASY_RUN",
      "distanceKm": 4,
      "targetPaceSecPerKm": null,
      "description": "이지런",
      "sortOrder": 2
    }
  ]
}
```

### GET /training-plans/me

내 훈련 계획 목록을 조회합니다.

Auth: Required

Query:

```text
page=1
limit=20
```

Response `data`:

```json
{
  "items": [
    {
      "id": 1,
      "title": "10km 완주 준비",
      "goalType": "GENERAL",
      "level": "INTERMEDIATE",
      "startDate": "2026-05-14T00:00:00.000Z",
      "endDate": "2026-05-20T00:00:00.000Z",
      "sourceType": "RULE_BASED",
      "createdAt": "2026-05-14T00:00:00.000Z",
      "updatedAt": "2026-05-14T00:00:00.000Z",
      "items": []
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

### GET /training-plans/:id

내 훈련 계획 상세를 조회합니다.

Auth: Required

Response `data`: `TrainingPlan`

---

## Domain Values

### TrainingPlan level

```text
BEGINNER
INTERMEDIATE
ADVANCED
```

### TrainingPlan sourceType

```text
RULE_BASED
```

### TrainingPlanItem workoutType

```text
REST
EASY_RUN
TEMPO_RUN
LONG_RUN
RECOVERY_RUN
```
