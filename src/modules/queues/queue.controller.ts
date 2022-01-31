import { Controller, Get, Query } from '@nestjs/common';
import { MessageProducerService } from './message-producer.service';
import { FileProducerService } from './file.producer.service';

@Controller()
export class QueueController {
    constructor(
        private messageProducerService: MessageProducerService,
        private fileProducerService: FileProducerService,
    ) {}

    @Get('send-message-with-queue')
    async sendMessage(@Query('msg') msg: string) {
        this.messageProducerService.sendMessage(msg);
        return msg;
    }

    //mgid-ao-image-mtv_peb9 - copia
    @Get('delete-file-with-queue')
    async deleteFile(@Query('fileName') fileName: string) {
        this.fileProducerService.deleteFile(fileName);
        return 'deleted';
    }
}
