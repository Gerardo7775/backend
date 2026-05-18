import { Module } from '@nestjs/common';
import { ViajesController } from './viajes.controller';
import { ViajesService } from './viajes.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ViajesController],
  providers: [ViajesService, PrismaService],
})
export class ViajesModule {}
