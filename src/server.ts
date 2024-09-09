import serverTiming from "@elysiajs/server-timing";
import app from "./app";
import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Context } from "elysia";
import cookie from "@elysiajs/cookie";

const port = process.env.PORT || 8000;

app.use(cors({
  credentials: true,
}));
app.use(serverTiming());
app.use(cookie());
app.use(
  swagger({
    documentation: {
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      openapi: "3.0.0",
      info: {
        title: "API Documentation",
        version: "0.5.2",
      },
      tags: [
        { name: "Role", description: "Role endpoints" },
        { name: "User", description: "User endpoints" },
        { name: "Auth", description: "Authentication endpoints" },
      ],
    },
    path: "/",
  })
);

app.all("*", (ctx: Context) => {
  ctx.set.status = 404;
  return {
    result: "ไม่พบข้อมูลเส้นทาง",
    status: 404,
  };
});

app.listen(port, () => {
  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
  );
});
