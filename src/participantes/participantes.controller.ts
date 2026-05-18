import { Body, Controller, Post } from '@nestjs/common';
import * as participantesService_1 from './participantes.service';

@Controller('participantes')
export class ParticipantesController {
  constructor(
    private readonly participantesService: participantesService_1.ParticipantesService,
  ) {}

  @Post()
  crear(@Body() body: participantesService_1.CrearFolioDto) {
    return this.participantesService.crearFolio(body);
  }

  @Post('login')
  loginTurista(@Body() body: { folio: string }) {
    return this.participantesService.validarFolio(body.folio);
  }
}
