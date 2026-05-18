import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import type { CrearViajeDto } from './viajes.service';

@Controller('viajes')
export class ViajesController {
  constructor(private readonly viajesService: ViajesService) {}

  // Crear un nuevo viaje
  @Post()
  crear(@Body() body: CrearViajeDto) {
    return this.viajesService.crearViaje(body);
  }

  // Obtener todos los viajes de una agencia con su itinerario y participantes
  @Get('agencia/:id')
  obtenerDeAgencia(@Param('id') id: string) {
    return this.viajesService.obtenerViajesPorAgencia(id);
  }

  // Obtener viaje activo del guía
  @Get('guia/:guiaId')
  obtenerViajeDeGuia(@Param('guiaId') guiaId: string) {
    return this.viajesService.obtenerViajeActivoDelGuia(guiaId);
  }
}
