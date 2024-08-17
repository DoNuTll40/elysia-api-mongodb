import { Context } from "elysia";
import { userRequestBody } from "../interface/interface";
import { createError } from "../util/createError";
import prisma from "../config/prisma";

export const signUp = async (ctx: Context) => {
    try {
        const body: unknown = ctx.body;

        const  { user_username, user_password, user_phone, user_email } = body as userRequestBody

        if(!user_username || !user_password || !user_phone || !user_email){
            return createError(ctx, 400, "ป้อนข้อมูลให้ครบทุกช่อง")
        }

        const checkUsername = await prisma.users.findFirst({
            where: { user_username },
        })

        const checkPhone = await prisma.users.findFirst({
            where: { user_phone }
        })

        const checkEmail = await prisma.users.findFirst({
            where: { user_email }
        })

        if(checkUsername){
            return createError(ctx, 400, "มีผู้ใช้งานชื่อนี้แล้ว")
        }

        if(checkPhone){
            return createError(ctx, 400, "มีผู้ใช้งานเบอร์โทรนี้แล้ว")
        }

        if(checkEmail){
            return createError(ctx, 400, "มีผู้ใช้งานอีเมลนี้แล้ว")
        }

        const addUser = await prisma.users.create({
            data: {
                user_username,
                user_password,
                user_phone,
                user_email,
            }
        })

        return {
            result: addUser,
            status: 200
        }

    }catch(err){
        console.log(err)
        ctx.set.status = 500
        return {
            message: "เกิดข้อผิดพลาดในการเชื่อมต่อ"
        }
    }
}