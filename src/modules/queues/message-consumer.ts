import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

//specifiying name of queue
@Processor('message-queue')
export class MessageConsumer {
    //we need to register the consumer in the module
    //every consumer should in every queue consumer should have its appropiate handler method
    //creating job handler
    @Process('message-job') //the name for this decorator is in the producer while is pushing job into register
    messageJob(job: Job<unknown>) {
        //this handler to automatically  triggered should be registered with name of job

        console.log(job.data);
    }

    //I stayed min 19:00
}
