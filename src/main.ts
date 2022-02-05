import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { startSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  startSwagger(app);
  await app.listen(3000);
  logger.log(`Server running - Port: ${await app.getUrl()}`);
}
bootstrap();
