import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TimeslotService } from './timeslot.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { TimeslotDto } from './dto/timeslot.dto'
import { OrderUpdateDto } from './dto/order-update.dto'

@Controller('user/timeslots')
export class TimeslotController {
	constructor(private readonly timeslotService: TimeslotService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') id: string) {
		return this.timeslotService.getAll(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: TimeslotDto, @CurrentUser('id') userId: string) {
		return this.timeslotService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('update-order')
	@Auth()
	async updateOrder(@Body() dto: OrderUpdateDto) {
		return this.timeslotService.updateOrder(dto.ids)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Body() dto: Partial<TimeslotDto>,
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		return this.timeslotService.update(dto, id, userId)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.timeslotService.delete(id, userId)
	}
}
