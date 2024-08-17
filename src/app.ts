
import { Elysia } from "elysia";
import { userRoute } from "./routes/user-route";
import { roleRoute } from "./routes/role-route";
import { authRoute } from "./routes/auth-route";

const app = new Elysia()
userRoute(app)
roleRoute(app)
authRoute(app)

export default app
