import Elysia from "elysia";
import { getUser, postUser } from "../controller/user-controller";

export const userRoute = (app: Elysia) => {
    app.get("/users", getUser)
    app.post("/users", postUser)
}