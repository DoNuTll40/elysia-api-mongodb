
import { Elysia } from "elysia";
import { userRoute } from "./routes/user-route";

const app = new Elysia()
userRoute(app)

export default app
