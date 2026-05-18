import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgenciasService {
  constructor(private prisma: PrismaService) {}

  // Registrar una nueva agencia con credenciales de acceso
  async registrarAgencia(datos: {
    nombre_comercial: string;
    razon_social: string;
    rfc: string;
    direccion_matriz: string;
    telefono_contacto: string;
    correo: string;
    password: string;
  }) {
    // Verificar que el correo no exista previamente
    const existente = await this.prisma.agencia.findUnique({
      where: { correo: datos.correo },
    });
    if (existente) {
      throw new ConflictException('Ya existe una agencia con ese correo.');
    }

    // Hashear la contraseña antes de guardar
    const password_hash = await bcrypt.hash(datos.password, 10);

    const agencia = await this.prisma.agencia.create({
      data: {
        nombre_comercial: datos.nombre_comercial,
        razon_social: datos.razon_social,
        rfc: datos.rfc,
        direccion_matriz: datos.direccion_matriz,
        telefono_contacto: datos.telefono_contacto,
        correo: datos.correo,
        password_hash,
      },
    });

    // Nunca devolver el hash al cliente
    const { password_hash: _, ...resultado } = agencia;
    return resultado;
  }

  // Login: verificar credenciales y devolver datos de la agencia
  async loginAgencia(correo: string, password: string) {
    const agencia = await this.prisma.agencia.findUnique({
      where: { correo },
    });

    if (!agencia) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    const passwordValido = await bcrypt.compare(
      password,
      agencia.password_hash,
    );
    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    // Devolver datos de sesión sin el hash
    const { password_hash: _, ...datosSesion } = agencia;
    return {
      mensaje: 'Autenticación exitosa',
      agencia: datosSesion,
    };
  }

  // Obtener todas las agencias (uso interno/admin)
  async obtenerAgencias() {
    return this.prisma.agencia.findMany({
      select: {
        id: true,
        nombre_comercial: true,
        razon_social: true,
        rfc: true,
        direccion_matriz: true,
        telefono_contacto: true,
        correo: true,
        created_at: true,
        // Excluir password_hash explícitamente
      },
    });
  }
}
