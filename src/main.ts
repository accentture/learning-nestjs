/* import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' }); */


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './modules/users/filters/global-exeption.filter';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions, SwaggerCustomOptions } from '@nestjs/swagger'
import { Chicken, CreateClientDto, Dog, Home } from './modules/clients-swagger/dto/create-cliet.dto';
import { Client } from './modules/clients-swagger/extra-models/client';

//import { Client } from './modules/clients/models/client.model';
import { CreateUser2Pipe } from './modules/users2-pipes/pipes/create-user.pipe';

//this file run our application
//nest.js use express

/* 
  --dependencies to install
    npm i -D dotenv @types/dotenv
*/

/* 
  --to generate a module
    nest g module config
    nest g mo database
*/

//internally nest use graph to resolve the relationship between module, providers and dependencies

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configuring a prefix for our API
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new CreateUser2Pipe()) //we can use global pipes, it apply to every controller and every route handler

  //app.useGlobalFilters(new GlobalExceptionFilter()) //using global filter


  const config = new DocumentBuilder() //build the project conforms the API specification
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  //const optionsSwagger = new TheOptionsSwagger(CatsModule, UserModule)


  // ------------------------------------------------ Document options
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey,
    extraModels: [

      Home,
      Dog,
      Chicken,
      Client

    ],

  };


  // ------------------------------------------------ Setup options
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'My API Docs',

  };


  //createDocument method: //it creates the full document with all HTTP routes defined
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document, customOptions);


  await app.listen(AppModule.port);



}
bootstrap();
