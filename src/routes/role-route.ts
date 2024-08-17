import Elysia from "elysia";
import { getRole, postRole } from "../controller/role-controller";

export const roleRoute = (app: Elysia) => {
    app.get('/role', getRole);
    app.post('/role', postRole);
}