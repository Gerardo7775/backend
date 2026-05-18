import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AgenciasModule } from './agencias/agencias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ViajesModule } from './viajes/viajes.module';
import { ParticipantesModule } from './participantes/participantes.module';
import { ActividadesModule } from './actividades/actividades.module';

@Module({
  imports: [
    PrismaModule,
    AgenciasModule,
    UsuariosModule,
    ViajesModule,
    ParticipantesModule,
    ActividadesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
