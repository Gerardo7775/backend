import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CrearActividadDto {
  viaje_id: string;
  nombre_actividad: string;
  direccion: string;
  lat: number;
  lng: number;
  fecha_programada: string;
  hora_programada: string;
  hora_fin: string;
  radio_geocerca_mts: number;
  es_rigido: boolean;
}

@Injectable()
export class ActividadesService {
  constructor(private prisma: PrismaService) {}

  async crearActividad(datos: CrearActividadDto) {
    return this.prisma.actividadInstancia.create({
      data: {
        viaje_id: datos.viaje_id,
        nombre_actividad: datos.nombre_actividad,
        direccion: datos.direccion,
        lat: datos.lat,
        lng: datos.lng,
        fecha_programada: new Date(datos.fecha_programada),
        hora_programada: new Date(datos.hora_programada),
        hora_fin: new Date(datos.hora_fin),
        estado: 'PROGRAMADO',
        radio_geocerca_mts: datos.radio_geocerca_mts,
        es_rigido: datos.es_rigido,
      },
    });
  }
}
