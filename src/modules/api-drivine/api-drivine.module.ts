import { Module } from '@nestjs/common';
import {
    DatabaseRegistry,
    DrivineModule,
    DrivineModuleOptions,
} from '@liberation-data/drivine';

@Module({
    imports: [
        //drivine
        //npm i @bitnine-oss/ag-driver   :   driver to work with drivine
        DrivineModule.withOptions(<DrivineModuleOptions>{
            connectionProviders: [
                DatabaseRegistry.buildOrResolveFromEnv('NEO'),
            ],
        }),
    ],
})
export class ApiDrivineModule {}
