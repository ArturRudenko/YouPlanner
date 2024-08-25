import { Priority } from '@prisma/client'
import { Transform } from 'class-transformer'
import {
	IsBoolean,
	IsEnum,
	IsOptional,
	IsString,
	IsNotEmpty
} from 'class-validator'

export class TaskDto {
	@IsNotEmpty({
		message: 'Name is required'
	})
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	createdAt?: string

	@IsOptional()
	@IsBoolean()
	isCompleted?: boolean

	@IsEnum(Priority)
	@IsOptional()
	@Transform(({ value }) => ('' + value).toLowerCase())
	priority?: Priority
}
