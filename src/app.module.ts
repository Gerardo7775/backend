import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AgenciasModule } from './agencias/agencias.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [PrismaModule, AgenciasModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
