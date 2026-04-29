export const APP_NAME = "RunPilot";

export const HEALTH_STATUS = {
  OK: "ok"
} as const;

export type HealthStatus = (typeof HEALTH_STATUS)[keyof typeof HEALTH_STATUS];

export type HealthResponse = {
  status: HealthStatus;
  service: "api";
};
