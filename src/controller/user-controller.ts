
import { Context } from "elysia";
import prisma from "../config/prisma";
import { createError } from "../util/createError";
import { userRequestBody } from "../interface/interface";
const crypto = require('crypto-js')

export const getUser = async (ctx: Context) => { // ctx เป็นชื่อตัวแปร ย่อมาจาก Context
    const rs = await prisma.users.findMany()
    if(rs.length !== 0){
        return { result: rs, status: 200 }
    }else{
        ctx.set.status = 400
        return {
            message: "ไม่พบข้อมูล"
        }
    }
}

export const postUser = async (ctx: Context) => {
    try {

        const body: unknown = ctx.body;

        const { user_username, user_password, user_phone, user_email, role_id } = body as userRequestBody;

        if (!user_username || !user_password || !user_phone || !user_email || !role_id){
            return createError(ctx, 400, "กรอกข้อมูลให้ครบ")
        }

        const checkUsername = await prisma.users.findFirst({
            where: { user_username }
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

        const hashPassowrd = crypto.AES.encrypt(user_password, process.env.CRYPTO_SECRET).toString();

        const addUser = await prisma.users.create({
            data: {
                user_username,
                user_password: hashPassowrd,
                user_phone,
                user_email,
                role: {
                    connect: {
                        role_id,
                    }
                }
            }
        })

        return {
            result: addUser,
            status: 200
        }

    }catch(err){
        console.log(err)
        return { message : "เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล" }
    }
}