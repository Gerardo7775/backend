import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar peticiones desde cualquier origen (Frontend)
  app.enableCors();

  // Escuchar en el puerto 3000 y en TODAS las interfaces de red (0.0.0.0)
  // para que funcione con tu nueva IP 10.202.231.101
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
void bootstrap();
