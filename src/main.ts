import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    // logger setup
    const logger = new Logger('bootstrap');
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // cors and prefix
    app.enableCors()
    app.setGlobalPrefix('v1/api')
    // validation setup
    app.useGlobalPipes(new ValidationPipe())
    // swagger configuration
    const config = new DocumentBuilder()
        .setTitle('GameBoss Rest API Documentation')
        .setDescription('This documentation created for GameBoss Mobile App')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs/v1', app, document);
    // listen app
    const PORT = process.env.PORT || 8000;
    await app.listen(PORT).then(() => {
      logger.log(`Listening on port: ${PORT}`)
    });
}
bootstrap();
