import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const startSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Avanza Debt Platform - API v1')
    .addBearerAuth()
    .setDescription(
      'Corporación Educativa Avanza - Debt Platform, API documentation',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
};
