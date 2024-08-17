import Elysia from "elysia";
import { getRole, postRole } from "../controller/role-controller";

export const roleRoute = (app: Elysia) => {
    app.group("/role", (app) =>
        app.get("/view", getRole, {
            detail: {
                tags: ['App']
            }
        })
            .post("/create", postRole, {
                detail: {
                    tags: ['App']
                }
            })
    );
};
