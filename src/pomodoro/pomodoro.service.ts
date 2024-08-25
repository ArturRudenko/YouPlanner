import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from '../user/user.service'
import { PomodoroSessionDto } from './dto/session.dto'
import { PomodoroRoundDto } from './dto/round.dto'

@Injectable()
export class PomodoroService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService
	) {}

	async getTodaySession(userId: string) {
		const today = new Date().toISOString().split('T')[0]

		return this.prisma.pomodoroSession.findFirst({
			where: {
				createdAt: {
					gte: new Date(today)
				},
				userId
			},
			include: {
				rounds: {
					orderBy: {
						id: 'desc'
					}
				}
			}
		})
	}

	async create(userId: string) {
		const todaySession = await this.getTodaySession(userId)

		if (!!todaySession) return todaySession

		const rounds = await this.userService.getUserRounds(userId)

		return this.prisma.pomodoroSession.create({
			data: {
				rounds: {
					createMany: {
						data: Array.from({ length: rounds }, () => ({ totalSeconds: 0 }))
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			},
			include: {
				rounds: true
			}
		})
	}

	async updateSession(
		dto: Partial<PomodoroSessionDto>,
		id: string,
		userId: string
	) {
		return this.prisma.pomodoroSession.update({
			where: {
				id,
				userId
			},
			data: dto
		})
	}

	async updateRound(dto: Partial<PomodoroRoundDto>, id: string) {
		return this.prisma.pomodoroRound.update({
			where: {
				id
			},
			data: dto
		})
	}

	async deleteSession(id: string, userId: string) {
		return this.prisma.pomodoroSession.delete({
			where: {
				id,
				userId
			}
		})
	}
}
