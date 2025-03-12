import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar la validación global
  app.useGlobalPipes(new ValidationPipe());
  //Politicas de CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(8001);
}
bootstrap();
