import {IsNotEmpty} from 'class-validator'
import { PriorityType } from 'src/types/taskColumnTypes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {

    @ApiProperty({
        example: 'New title',
        required: true
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'New description',
        required: true
    })
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: '2024/09/13 (year/mm/day)',
        required: true
    })
    @IsNotEmpty()
    dueDate: Date;

    @ApiProperty({
        example: 'High or Medium or Low',
        required: true
    })
    @IsNotEmpty()
    priority: PriorityType;

    @ApiProperty({
        example: 'Caroline',
        required: true
    })
    @IsNotEmpty()
    assignedMember: string;
}