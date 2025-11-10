import { OpenAPIHono } from "@hono/zod-openapi"
import { notFound, onError } from "stoker/middlewares";
import { logger } from "./middlewares/pinoLogger";

const app = new OpenAPIHono();

app.use(logger())

app.get('/', (c) => {
    return c.text('Hola Salvaje!!')
})

app.get('/error', (c) => {
    throw new Error('Oh no')
})

app.notFound(notFound)
app.onError(onError)

export default app;