import { Injectable } from '@nestjs/common';

import { InjectCypher, InjectPersistenceManager, PersistenceManager, QuerySpecification, Statement, Transactional } from '@liberation-data/drivine';


@Injectable()
export class RouteRepository {

    /* constructor(
        @InjectPersistenceManager() readonly persistenceManager: PersistenceManager,
        @InjectCypher('@/traffic/routesBetween') readonly routesBetween: Statement
    ) {}

    @Transactional() // Has default Propagation.REQUIRED - so partipicate in a current txn, or start one.
    async findFastestBetween(start: string, destination: string): Promise<Route> {
        return this.persistenceManager.getOne(
            new QuerySpecification<Route>()
                .withStatement(this.routesBetween)
                .bind([start, destination])
                .limit(1)
                .transform(Route)
        );
    } */

}
