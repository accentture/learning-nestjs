import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MessageProducerService {
    //injecting the queue
    //@InjectQueue: it decorator help to create the queue with our specified configurations
    //message-queue: passing queue name as token
    constructor(@InjectQueue('message-queue') private queue: Queue) {}

    async sendMessage(msg: string) {
        //pushing the messages into the register(redis)
        //creating a job and pushing that data to the job
        //the first param is a job name
        //the second param is the payload
        await this.queue.add(
            'message-job',
            {
                //so everything that we pushed in our data is considered a job
                //the consumer will use the same job root trigger automatically

                message: msg, //this is the consumer
            },

            //to check if the queue is working as a background, we delay our job
            { delay: 12000 },
        );
    }
}
