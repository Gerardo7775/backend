import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AgenciasService } from './agencias.service';

@Controller('agencias')
export class AgenciasController {
  constructor(private readonly agenciasService: AgenciasService) {}

  // Registro de nueva agencia con credenciales
  @Post('registrar')
  registrar(
    @Body()
    body: {
      nombre_comercial: string;
      razon_social: string;
      rfc: string;
      direccion_matriz: string;
      telefono_contacto: string;
      correo: string;
      password: string;
    },
  ) {
    return this.agenciasService.registrarAgencia(body);
  }

  // Login de agencia existente
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body()
    body: {
      correo: string;
      password: string;
    },
  ) {
    return this.agenciasService.loginAgencia(body.correo, body.password);
  }

  @Get()
  obtenerTodas() {
    return this.agenciasService.obtenerAgencias();
  }
}
