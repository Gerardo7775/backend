import { Body, Controller, Post } from '@nestjs/common';
import * as viajesService_1 from './viajes.service';

@Controller('viajes')
export class ViajesController {
  constructor(private readonly viajesService: viajesService_1.ViajesService) {}

  @Post()
  crear(@Body() body: viajesService_1.CrearViajeDto) {
    return this.viajesService.crearViaje(body);
  }
}
