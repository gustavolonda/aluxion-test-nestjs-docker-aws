import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Aluxion API')
    .setDescription('The Aluxion API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  app.enableCors(
    { 
      origin: ['http://localhost:3000', 'https://www.google.com'],
    }
  );
  await app.listen(3000);
}
bootstrap();