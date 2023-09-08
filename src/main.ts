import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.PORT || 3000;
  app.setGlobalPrefix('api');
  console.log('Port running on: ', port);

  const config = new DocumentBuilder()
    .setTitle('Vehicle management system')
    .setDescription('The vehicle management API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new RolesGuard(reflector));

  await app.listen(port);
}
bootstrap();
