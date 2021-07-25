import { SequelizeModule } from '@nestjs/sequelize';
import { ConnectionOptions } from 'sequelize/types';
import { Configuration } from 'src/config/config.keys';
import { ConfigModule } from 'src/config/config.module';

import { ConfigService } from 'src/config/config.service';
//import { ConfigService } from './../config/config.service';

//it will be an array of connections

import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/models/user.entity';



export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mariadb',
                host: 'localhost',
                port: 3307,
                username: 'root',
                password: '',
                database: 'demoMariaDB',
            });
            sequelize.addModels([User]);
            //sequelize.addModels([__dirname + '/../**entity{.ts,.js}'])
            await sequelize.sync();
            return sequelize;
        },
    },
]

