import { IsArray, IsString } from 'class-validator'

export class OrderUpdateDto {
	@IsArray()
	@IsString({ each: true })
	ids: string[]
}
