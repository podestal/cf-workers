import { pinoLogger } from "hono-pino"

export const logger = () => {
    return pinoLogger({
        pino: {
            level: 'debug',
        },
    })
} 