import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TimeslotDto } from './dto/timeslot.dto'

@Injectable()
export class TimeslotService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.timeslot.findMany({
			where: {
				userId
			},
			orderBy: {
				order: 'asc'
			}
		})
	}

	async create(dto: TimeslotDto, userId: string) {
		return this.prisma.timeslot.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async update(dto: Partial<TimeslotDto>, id: string, userId: string) {
		return this.prisma.timeslot.update({
			where: {
				id,
				userId
			},
			data: dto
		})
	}

	async delete(id: string, userId: string) {
		return this.prisma.timeslot.delete({
			where: {
				id,
				userId
			}
		})
	}

	async updateOrder(ids: string[]) {
		return this.prisma.$transaction(
			ids.map((id, order) =>
				this.prisma.timeslot.update({ where: { id }, data: { order } })
			)
		)
	}
}
