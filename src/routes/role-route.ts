import Elysia from "elysia";
import { getRole } from "../controller/role-controller";

export const roleRoute = (app: Elysia) => {
    app.get('role', getRole)
}