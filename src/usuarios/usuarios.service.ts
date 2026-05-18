import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolUsuario } from '@prisma/client';

export interface CrearUsuarioDto {
  id_agencia: string;
  nombre_completo: string;
  correo: string;
  telefono: string;
  especialidad_idiomas?: string;
  rol: RolUsuario;
  password_hash: string;
}

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async crearUsuario(datos: CrearUsuarioDto) {
    return this.prisma.usuario.create({
      data: {
        id_agencia: datos.id_agencia,
        nombre_completo: datos.nombre_completo,
        correo: datos.correo,
        telefono: datos.telefono,
        especialidad_idiomas: datos.especialidad_idiomas,
        rol: datos.rol,
        password_hash: datos.password_hash,
        estado: 'ACTIVO',
      },
    });
  }

  async loginGuia(datos: { correo: string; password?: string }) {
    // Busca al guía en la base de datos (con el correo que creamos hace rato)
    const guia = await this.prisma.usuario.findFirst({
      where: {
        correo: datos.correo,
      },
    });

    if (!guia) {
      throw new Error('Guía no encontrado');
    }

    // Para la demo, el frontend envía 'password' y en la bd está en 'password_hash' sin encriptar.
    if (guia.password_hash !== datos.password) {
      throw new Error('Credenciales incorrectas');
    }

    return {
      exito: true,
      mensaje: '¡Bienvenido a la expedición!',
      usuario: guia,
      token: 'token-magico-guia-123',
    };
  }

  async loginConFolioYTelefono(datos: { folio: string; telefono: string }) {
    // 1. En producción aquí validaríamos que el 'folio' coincida con una Agencia real.
    // 2. Buscamos al guía por su número de teléfono.
    const guia = await this.prisma.usuario.findFirst({
      where: {
        telefono: datos.telefono,
      },
    });

    if (!guia) {
      throw new Error(
        'No se encontró un guía con este número de teléfono registrado.',
      );
    }

    return {
      exito: true,
      mensaje: 'Autenticación rápida exitosa',
      usuario: guia,
      token: 'token-acceso-rapido-123',
    };
  }
}
