import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar la validación global
  app.useGlobalPipes(new ValidationPipe());
  //Politicas de CORS
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
