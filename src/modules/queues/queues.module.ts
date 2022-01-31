import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { FileConsumer } from './file.consumer';
import { FileProducerService } from './file.producer.service';
import { MessageConsumer } from './message-consumer';
import { MessageProducerService } from './message-producer.service';
import { QueueController } from './queue.controller';

@Module({
    imports: [
        BullModule.forRoot({
            //configuring redis cache
            redis: {
                host: 'localhost',
                port: 5003,
            },

            /* 
            we can have a number of queues for our application, these queues should be registered here
        */
        }),
        //to register a queue
        BullModule.registerQueue(
            {
                //specifiying name of queue
                name: 'message-queue',
                //the producer pushes the messages in our queue
            },

            //registering another queue
            {
                name: 'file-operation',
            },
        ),
    ],
    controllers: [QueueController],
    providers: [
        MessageProducerService,
        FileProducerService,
        MessageConsumer,
        FileConsumer,
    ],
})
export class QueuesModule {}

/* 
  --in Nest.js produce is a service
  --controller invoke the producer
  --controller will push the job to redis, inmediatly return a response
  --when the user receive the response, the job might no be completed

  --in redis there is classes as consumers
  --the consumers will read request from redis
  --the consumers functionality is not lies within the user request
  --the consumers will try to read the jobs
        --seems that the job finished by the consumers will be added newly to the queue
*/
/* 

  DOCUMENTATION: https://docs.nestjs.com/techniques/queues
  I need: https://redis.io/

  I stayed here in the documentation: Installation
*/

/* 
  - search redis in docker hub
  
  - copy the next command in the cmd
    docker pull redis

  - to run cotainer of redis
    docker run --name rediscontainer -p 5003:6379 -d redis
                                    -p : port
                                    5003: port that I want to use in redis
                                    6379: port where Redis run by default
                                    -d :to run in the background
                                    redis : name of my image


    6a659153fdf950eaecad18a26e4f9df599ea3be63fc22a1c4411e86e041919e3
        --it means that docker redis container is running

    --to check port where is running docker
      docker ps -a

    --to re-start my rediscontainer
      docker start rediscontainer
 */

/* 
  --now we can use redis cli
    docker exec -it rediscontainer redis-cli

  --we can set and get variable in redis cli
    set myVariable redisdemo
    get myVariable

  
*/
