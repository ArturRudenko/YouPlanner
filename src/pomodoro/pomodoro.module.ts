import { Module } from '@nestjs/common'
import { PomodoroService } from './pomodoro.service'
import { PomodoroController } from './pomodoro.controller'
import { PrismaService } from 'src/prisma.service'
import { UserModule } from '../user/user.module'

@Module({
	imports: [UserModule],
	controllers: [PomodoroController],
	providers: [PomodoroService, PrismaService]
})
export class PomodoroModule {}
