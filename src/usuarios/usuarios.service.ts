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
}
