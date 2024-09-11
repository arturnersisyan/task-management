import { ApiProperty } from "@nestjs/swagger";
import { StatusType } from "src/types/taskColumnTypes";

export class UpdateTaskDto {
    @ApiProperty({
        example: 'Pending or In Progress or Completed',
        required: true
    })
    status: StatusType
}