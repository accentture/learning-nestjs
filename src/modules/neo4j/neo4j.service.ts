import { Inject, Injectable } from '@nestjs/common';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './ne4j.constants';
import { Neo4jConfig } from './neo4j-config.interface';
import neo4j, { Driver } from 'neo4j-driver';
import { Result } from 'neo4j-driver';

@Injectable()

//adding usefull methods to read and write from Neo4j
//it will help to void boilerplate code around of query
export class Neo4jService {
    //injecting NE4J_CONFIG
    constructor(
        @Inject(NEO4J_CONFIG) private readonly config: Neo4jConfig,
        @Inject(NEO4J_DRIVER) private readonly driver: Driver,
    ) {}
    getDriver() {
        return this.driver;
    }
    getConfig(): Neo4jConfig {
        return this.config;
    }

    //to read session
    //optionally when we create a session we may pass a database connection
    getReadSession(database?: string) {
        //to make a query first we need to create a session and use this session to run a query
        return this.driver.session(
            //session take database details

            {
                database: database || this.config.database,

                //defaultAccessMode: if a create a transaction for the session, then it will override this
                defaultAccessMode: neo4j.session.READ,
            },
        );
    }

    //to write session
    getWriteSession(database?: string) {
        //session take database details
        return this.driver.session({
            database: database || this.config.database,

            //if a create a transaction for the session
            defaultAccessMode: neo4j.session.WRITE,
        });
    }

    //read from database
    read(
        cypher: string,
        params: Record<string, any>,
        database?: string,
    ): Result {
        const session = this.getReadSession(database);
        return session.run(cypher, params);
    }

    //write in database
    write(
        cypher: string,
        params: Record<string, any>,
        database?: string,
    ): Result {
        const session = this.getWriteSession(database);
        return session.run(cypher, params);
    }
}
