import { Body, Controller, Post } from '@nestjs/common';
import { IaService } from './ia.service';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post('traducir-menu')
  traducir(@Body() body: { textoEscaneado: string; monedaDestino: string }) {
    return this.iaService.procesarMenuMenu(body);
  }
}
