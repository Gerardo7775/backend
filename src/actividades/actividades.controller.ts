import { Body, Controller, Post } from '@nestjs/common';
import * as actividadesService_1 from './actividades.service';

@Controller('actividades')
export class ActividadesController {
  constructor(
    private readonly actividadesService: actividadesService_1.ActividadesService,
  ) {}

  @Post()
  crear(@Body() body: actividadesService_1.CrearActividadDto) {
    return this.actividadesService.crearActividad(body);
  }
}
