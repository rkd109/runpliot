# API Spec

## GET /

API 기본 상태를 반환합니다.

```json
{
  "name": "RunPilot",
  "message": "RunPilot API is running"
}
```

## GET /health

헬스 체크 응답을 반환합니다.

```json
{
  "status": "ok",
  "service": "api"
}
```
