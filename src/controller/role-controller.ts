import { Context } from "elysia";
import prisma from "../config/prisma";
import { createError } from "../util/createError";
import { roleRequestBody } from "../interface/interface";

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

export const postRole = async (ctx: Context) => {
    try {
        const body: unknown = ctx.body;

        const { role_type } = body as roleRequestBody;

        const checkRole = await prisma.role.findFirst({
            where: { role_type }
        })

        if(checkRole){
            return createError(ctx, 400, "มีตำแหน่งนี้อยู่ในระบบเรียบร้อยแล้ว")
        }

        const addRole = await prisma.role.create({
            data: {
                role_type,
            }
        })

        return {
            result: addRole,
            status: 200
        }

    }catch(err){
        console.log(err)
        ctx.set.status = 500;
        return { message: "เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล" };
    }
}

export const updateRole = async (ctx: Context) => {
    try {
        const { roleId } = ctx.params;
        const body: unknown = ctx.body;
        
        if(body === undefined){
            return createError(ctx, 400, "ไม่พบข้อมูลที่ป้อนเข้ามา, โปรดลองใหม่")
        }

        if (!/^[a-fA-F0-9]{24}$/.test(roleId)) {
            return createError(ctx, 400, "รูปแบบหมายเลขไอดีไม่ถูกต้อง");
        }

        const { role_type } = body as roleRequestBody;

        const checkRoleId = await prisma.role.findFirst({
            where: {
                role_id: roleId
            }
        })

        if(!checkRoleId){
            return createError(ctx, 400, "ไม่พบไอดีที่ต้องการแก้ไข, โปรดลองใหม่")
        }

        if(!role_type){
            return createError(ctx, 400, "ไม่พบข้อมูลที่ป้อนเข้ามา, โปรดลองใหม่")
        }

        const upRole = await prisma.role.update({
            where: {
                role_id: roleId
            },
            data: {
                role_type,
            }
        })

        return {
            result: upRole,
            status: 200
        }

    }catch(err){
        console.log(err)
        ctx.set.status = 500;
        return { message: "เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล" };
    }
}