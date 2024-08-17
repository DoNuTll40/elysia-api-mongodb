
import serverTiming from "@elysiajs/server-timing"
import app from "./app"
import { cors } from '@elysiajs/cors'
import swagger from "@elysiajs/swagger"
import { Context } from "elysia"

const port = process.env.PORT || 8000

app.use(cors())
app.use(serverTiming())
app.use(swagger({
    documentation: {
        info: {
            title: 'API Documentation',
            version: '0.5.2'
        },
        tags: [
            { name: 'App', description: 'General endpoints' },
            { name: 'Auth', description: 'Authentication endpoints' },
        ]
    },
    path: '/swagger'
}))

app.all("*", (ctx: Context) => {
    ctx.set.status = 404
    return {
        result: "ไม่พบข้อมูลเส้นทาง",
        status: 404,
    };
});

app.listen(port, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
})