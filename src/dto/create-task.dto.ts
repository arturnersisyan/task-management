import {IsNotEmpty} from 'class-validator'
import { PriorityType } from 'src/types/taskColumnTypes';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    dueDate: Date;

    @IsNotEmpty()
    priority: PriorityType;

    @IsNotEmpty()
    assignedMember: string;
}