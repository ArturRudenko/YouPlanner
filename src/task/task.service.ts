import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskDto } from './dto/task.dto'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.task.findMany({
			where: {
				userId
			}
		})
	}

	async create(dto: TaskDto, userId: string) {
		return this.prisma.task.create({
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

	async update(dto: Partial<TaskDto>, id: string, userId: string) {
		return this.prisma.task.update({
			where: {
				id,
				userId
			},
			data: dto
		})
	}

	async delete(id: string) {
		return this.prisma.timeslot.delete({
			where: {
				id
			}
		})
	}
}
