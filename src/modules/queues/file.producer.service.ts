import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class FileProducerService {
    constructor(@InjectQueue('file-operation') private queue: Queue) {}
    async deleteFile(fileName: string) {
        //login to delete file from database
        let filePath = `E:/images/${fileName}.jpg`;
        await this.queue.add(
            'delete-file',
            {
                path: filePath,
            },
            { delay: 10000 },
        );
    }
}
