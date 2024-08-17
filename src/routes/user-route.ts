import Elysia from "elysia";
import { userController } from "../controller/user-controller";

export const userRoute = (app: Elysia) => {
    app.get("/users", userController)
}