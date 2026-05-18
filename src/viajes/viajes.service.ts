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

  // Crear un nuevo viaje para una agencia
  async crearViaje(datos: CrearViajeDto) {
    return this.prisma.viaje.create({
      data: {
        agencia_id: datos.agencia_id,
        nombre_viaje: datos.nombre_viaje,
        estado: 'PROGRAMADO',
        distancia_max_global: datos.distancia_max_global, // En metros
        tiempo_desconexion_global: datos.tiempo_desconexion_global, // En minutos
      },
    });
  }

  // Obtener todos los viajes de una agencia con participantes e itinerario
  async obtenerViajesPorAgencia(agenciaId: string) {
    return this.prisma.viaje.findMany({
      where: { agencia_id: agenciaId },
      include: {
        // Participantes del viaje (guías y turistas)
        participantes: true,
        // Actividades del itinerario ordenadas por hora
        actividades: {
          orderBy: { hora_programada: 'asc' },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  // Obtener el viaje activo (o programado) del guía
  async obtenerViajeActivoDelGuia(guiaId: string) {
    const guia = await this.prisma.usuario.findUnique({
      where: { id: guiaId },
    });

    if (!guia) {
      throw new Error('Guía no encontrado');
    }

    return this.prisma.viaje.findFirst({
      where: {
        agencia_id: guia.id_agencia,
        // Puede ser PROGRAMADO o EN_CURSO
        estado: { in: ['PROGRAMADO', 'EN_CURSO'] },
      },
      include: {
        participantes: true,
        actividades: {
          orderBy: { hora_programada: 'asc' },
        },
      },
    });
  }
}
