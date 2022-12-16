import winston from 'winston'
import morgan from 'morgan'

export class Logger {
    private static logger: winston.Logger

    public static setLogger() {
        const format = winston.format.printf((info: winston.Logform.TransformableInfo): string => {
            return winston.format
                .colorize()
                .colorize(info.level, `[ ${info.timestamp} ] [ ${info.level.toUpperCase()} ] : ${info.message}`)
        })
        const timestamp = winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
        this.logger = winston.createLogger({
            format: winston.format.combine(timestamp, format),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: './logs/error.log',
                    level: 'error',
                }),
                new winston.transports.File({
                    filename: './logs/combined.log',
                }),
            ],
        })
    }

    public static log(level: string, message: string) {
        this.logger.log(level, message)
    }

    public static httpLogger() {
        return morgan(':method :url :status :response-time ms - :res[content-length]', {
            stream: {
                write: (message: string) => {
                    this.log('info', message.substring(0, message.lastIndexOf('\n')))
                },
            },
        })
    }
}
