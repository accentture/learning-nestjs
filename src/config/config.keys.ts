//it is better to use a enum to create a magic string, to void change in different places the value of PORT

export enum Configuration {
    PORT = "PORT",
    HOST = 'HOST',
    USERNAME = 'USERNAME',
    PASSWORD = 'PASSWORD',
    DATABASE = 'DATABASE'
}