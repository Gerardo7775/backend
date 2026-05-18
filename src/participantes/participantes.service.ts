import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CrearFolioDto {
  viaje_id: string;
  folio_acceso: string;
}

@Injectable()
export class ParticipantesService {
  constructor(private prisma: PrismaService) {}

  async crearFolio(datos: CrearFolioDto) {
    return this.prisma.participanteViaje.create({
      data: {
        viaje_id: datos.viaje_id,
        rol_en_viaje: 'TURISTA',
        folio_acceso: datos.folio_acceso,
        estado_digital: 'PENDING',
        estado_conexion: 'OFFLINE',
      },
    });
  }

  async validarFolio(folio: string) {
    const participante = await this.prisma.participanteViaje.findFirst({
      where: { 
        folio_acceso: folio 
      },
      include: {
        viaje: {
          include: {
            actividades: {
              orderBy: { hora_programada: 'asc' }
            }
          }
        }
      }
    });

    if (!participante) {
      throw new Error('Folio inválido o viaje no encontrado');
    }

    return {
      exito: true,
      mensaje: '¡Pase de abordar validado!',
      participante: participante,
      viaje: participante.viaje,
      token: 'token-turista-123'
    };
  }
}
