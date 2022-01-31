import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as fs from 'fs';

@Processor('file-operation')
export class FileConsumer {
    @Process('delete-file')
    async fileOperation(job: Job<unknown>) {
        let value: any = job.data;

        setTimeout(() => {
            fs.unlinkSync(value.path);
        }, 10000);
    }
}
