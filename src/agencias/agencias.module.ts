import { Module } from '@nestjs/common';
import { AgenciasController } from './agencias.controller';
import { AgenciasService } from './agencias.service';
import { PrismaService } from '../prisma/prisma.service'; // <-- Importamos Prisma

@Module({
  controllers: [AgenciasController],
  providers: [AgenciasService, PrismaService], // <-- Lo agregamos a los proveedores
})
export class AgenciasModule {}
