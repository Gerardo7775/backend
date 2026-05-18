import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CrearViajeDto {
  agencia_id: string;
  nombre_viaje: string;
  distancia_max_global: number;
  tiempo_desconexion_global: number;
}

@Injectable()
export class ViajesService {
  constructor(private prisma: PrismaService) {}

  async crearViaje(datos: CrearViajeDto) {
    return this.prisma.viaje.create({
      data: {
        agencia_id: datos.agencia_id,
        nombre_viaje: datos.nombre_viaje,
        estado: 'PROGRAMADO', // Ya usamos nuestro Enum del esquema
        distancia_max_global: datos.distancia_max_global, // En metros (ej. 50 mts)
        tiempo_desconexion_global: datos.tiempo_desconexion_global, // En minutos (ej. 15 min)
      },
    });
  }
}
