import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgenciasService } from './agencias.service';

@Controller('agencias')
export class AgenciasController {
  constructor(private readonly agenciasService: AgenciasService) {}

  @Post()
  crear(
    @Body()
    body: {
      nombre_comercial: string;
      razon_social: string;
      rfc: string;
      direccion_matriz: string;
      telefono_contacto: string;
    },
  ) {
    return this.agenciasService.crearAgencia(body);
  }

  @Get()
  obtenerTodas() {
    return this.agenciasService.obtenerAgencias();
  }
}
