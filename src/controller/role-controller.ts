import { Context } from "elysia";
import prisma from "../config/prisma";
import { createError } from "../util/createError";

export const getRole = async (ctx: Context) => {
    try {
        const result = await prisma.role.findMany()
        if(result.length === 0){
            return createError(ctx, 400, "ไม่พบข้อมูล")
        }
        return {
            body: result,
            status: 200
        }
    }catch(err){
        console.log(err)
        ctx.set.status = 500;
        return { message: "เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล" };
    }
}