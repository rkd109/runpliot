import { PartialType } from "@nestjs/swagger";
import { CreateRunningRecordDto } from "./create-running-record.dto";

export class UpdateRunningRecordDto extends PartialType(CreateRunningRecordDto) {}