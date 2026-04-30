import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import 'dotenv/config';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('RunPilot API')
    .setDescription('RunPilot backend API documentation')
    .setVersion('0.1.0')
    .addTag('runpilot')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();