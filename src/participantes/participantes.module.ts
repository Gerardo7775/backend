import { Module } from '@nestjs/common';
import { ParticipantesController } from './participantes.controller';
import { ParticipantesService } from './participantes.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ParticipantesController],
  providers: [ParticipantesService, PrismaService],
})
export class ParticipantesModule {}
