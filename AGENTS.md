# RunPilot Instructions

## Read First
- docs/project-context.md
- docs/architecture.md

## Coding Rules
- Use arrow functions where possible.
- Do not return Prisma models directly.
- Use DTO and Mapper.
- Follow global API response format.
- Use sessionStorage on frontend auth.
- Do not introduce new libraries without asking.

## Backend Rules
- Controller only handles request/response.
- Service contains business logic.
- Mapper converts entity/model to response DTO.
- Validate requests with DTOs and the global ValidationPipe.
- Protect user-owned resources with JWT userId ownership checks.
- Do not expose UsersModule routes unless intentionally reworking signup/admin features.

## Frontend Rules
- Use apiClient in utils.
- Keep API logic out of components.
- Prefer small reusable components.
- Use the shared Axios instance from apps/web/src/utils/api.ts.
- Keep auth token handling in session-storage utilities and AuthProvider.