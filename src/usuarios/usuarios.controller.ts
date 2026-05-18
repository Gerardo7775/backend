import { Body, Controller, Post } from '@nestjs/common';
import * as usuariosService_1 from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: usuariosService_1.UsuariosService,
  ) {}

  @Post()
  crear(@Body() body: usuariosService_1.CrearUsuarioDto) {
    return this.usuariosService.crearUsuario(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.usuariosService.loginGuia(body);
  }

  @Post('login-agencia')
  loginAgencia(@Body() body: { folio: string; telefono: string }) {
    return this.usuariosService.loginConFolioYTelefono(body);
  }
}
