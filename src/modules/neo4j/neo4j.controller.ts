import { Controller, Get, Query } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Controller()
export class Neo4jController {
    constructor(private readonly neo4jService: Neo4jService) {}

    @Get('neo4j')
    async sendMessage() {
        const result = await this.neo4jService.read(
            'MATCH (n) RETURN count(n) AS count',
            {},
        );

        //to get the results we can loop the result
        const count = result.records[0].get('count');
        return `There are ${count} nodes in the database`;
    }
}
