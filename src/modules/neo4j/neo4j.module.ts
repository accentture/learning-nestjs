import { DynamicModule, Inject, Module } from '@nestjs/common';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './ne4j.constants';
import { Neo4jConfig } from './neo4j-config.interface';
import { Neo4jController } from './neo4j.controller';
import { Neo4jService } from './neo4j.service';
import { createDriver } from './neo4j.utils';

@Module({
    //this will be resolved as static module
    //providers: [Neo4jService],
})

//dynamic modules: to cuztomize modules
export class Neo4jModule {
    //this method is for sttatic conventions from Neo4j documentation
    static forRoot(config: Neo4jConfig): DynamicModule {
        return {
            module: Neo4jModule,
            providers: [
                Neo4jService, //injecting service
                {
                    //so whatever that is NEO4J_CONFIG, inject it and config will be injected instead
                    provide: NEO4J_CONFIG, //the provide will be defined on runtime (on fly)
                    useValue: config, //we register the config
                },
                {
                    //to get an instance of driver
                    provide: NEO4J_DRIVER,
                    inject: [NEO4J_CONFIG], //here NEO4J_CONFIG will define that is passend to the createDriver function, it with the target to get context
                    useFactory: async (config: Neo4jConfig) =>
                        createDriver(config), //the driver can be now injected in any class using @Inject() annotation
                },
            ],
            controllers: [Neo4jController],
        };
    }
}
