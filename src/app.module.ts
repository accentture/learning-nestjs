import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/users/user.module';
import { CatsModule } from './modules/cats/cats.module';
import { ClientsModule } from './modules/clients-swagger/clients.module';
import { Users2pipesModule } from './modules/users2-pipes/users2pipes.module';


@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    CatsModule,
    ClientsModule,
    Users2pipesModule], //between imports are the dependencies that this module will use
  controllers: [AppController], //set of controllers for this module and must be instantiated
  providers: [AppService], //registering provider for this module, it will alow resolve the depencies of other elements, besides the instances be able to be shared between this module
})
export class AppModule {

  //static : it means that is not necessary to create an instance of this object, because always will be in memory
  static port: number | string

  //  _ : underscore is used to indicate that it is a injected service 
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT)
  }
}

