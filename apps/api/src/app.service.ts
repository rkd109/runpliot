import { Injectable } from "@nestjs/common";
import { APP_NAME, HEALTH_STATUS, type HealthResponse } from "@runpilot/shared";

@Injectable()
export class AppService {
  getRoot() {
    return {
      name: APP_NAME,
      message: "RunPilot API is running"
    };
  }

  getHealth(): HealthResponse {
    return {
      status: HEALTH_STATUS.OK,
      service: "api"
    };
  }
}
