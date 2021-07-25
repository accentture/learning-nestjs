import * as fs from 'fs'
import { parse } from 'dotenv'

export class ConfigService {
    private readonly envConfig: { [key: string]: string }

    constructor(

    ) {

        //NODE_ENV : it variable is declared in production
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production'

        //when we are in development
        if (isDevelopmentEnv) {

            //__dirname : it is an variable of node.js that make reference to src/config folder
            const envFilePath = __dirname + '/../../.env'

            //checking if exists path of .env
            const existsPath = fs.existsSync(envFilePath) //return a boolean

            if (!existsPath) {
                console.log('.env file does not exist')
                process.exit(0)//finishing process of node.js with a value 0
            }

            //parse method conver the .env file in an json
            //readFileSync : to read the file syncronusly
            this.envConfig = parse(fs.readFileSync(envFilePath))

        } else {

            //when we are in production
            this.envConfig = {
                //process is the global object of node.js
                PORT: process.env.PORT
            }

        }
    }

    get(key: string): string {
        return this.envConfig[key]
    }
}