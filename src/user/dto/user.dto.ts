import { UserIntervalsDto } from './intervals.dto'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UserDto extends UserIntervalsDto {
	@IsOptional()
	@IsEmail()
	email?: string

	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	@IsString()
	password?: string
}