
import serverTiming from "@elysiajs/server-timing"
import app from "./app"
import { cors } from '@elysiajs/cors'

const port = process.env.PORT

app.use(cors())
app.use(serverTiming())

app.listen(Number(port), () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
})