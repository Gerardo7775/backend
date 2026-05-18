import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgenciasService {
  constructor(private prisma: PrismaService) {}

  // Función para crear una nueva agencia
  async crearAgencia(datos: {
    nombre_comercial: string;
    razon_social: string;
    rfc: string;
    direccion_matriz: string;
    telefono_contacto: string;
  }) {
    return this.prisma.agencia.create({
      data: {
        nombre_comercial: datos.nombre_comercial,
        razon_social: datos.razon_social,
        rfc: datos.rfc,
        direccion_matriz: datos.direccion_matriz,
        telefono_contacto: datos.telefono_contacto,
      },
    });
  }

  // Función para ver todas las agencias
  async obtenerAgencias() {
    return this.prisma.agencia.findMany();
  }
}
