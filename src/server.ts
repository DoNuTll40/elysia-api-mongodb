
import serverTiming from "@elysiajs/server-timing"
import app from "./app"
import { cors } from '@elysiajs/cors'
import swagger from "@elysiajs/swagger"

const port = process.env.PORT || 8000

app.use(cors())
app.use(serverTiming())
app.use(swagger({
    documentation: {
        info: {
            title: 'API Documentation',
            version: '1.0.1'
        }
    },
    path: '/swagger'
}))

app.listen(port, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
})