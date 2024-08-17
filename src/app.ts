
import { Elysia } from "elysia";
import { userRoute } from "./routes/user-route";
import { roleRoute } from "./routes/role-route";

const app = new Elysia()
userRoute(app)
roleRoute(app)

export default app
