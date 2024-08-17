import Elysia from "elysia";
import { getRole, postRole, updateRole } from "../controller/role-controller";

export const roleRoute = (app: Elysia) => {
    app.group("/role", (app) =>
        app
            .get("/view", getRole, {
            detail: {
                tags: ['App'],
                summary: 'ดูตำแหน่ง',
            }
        })
            .post("/create", postRole, {
                detail: {
                    tags: ['App'],
                    summary: 'สร้างตำแหน่ง',
                }
            })
            
            .patch("/update/:roleId", updateRole, {
                detail: {
                    tags: ['App'],
                    summary: 'อัพเดตตำแหน่ง'
                }
            })
    );
};
