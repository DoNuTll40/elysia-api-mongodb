
import { Context } from "elysia";
import prisma from "../config/prisma";
import { createError } from "../util/createError";
import { userRequestBody } from "../interface/user-interface";

export const getUser = async (ctx: Context) => { // ctx เป็นชื่อตัวแปร ย่อมาจาก Context
    const rs = await prisma.users.findMany()
    if(rs.length !== 0){
        return { result: rs }
    }else{
        return {
            message: "ไม่พบข้อมูล"
        }
    }
}

export const postUser = async (ctx: Context) => {
    try {

        const body: userRequestBody = await ctx.request.json()

        const { user_username, user_password, user_phone, user_email, role_id } = body;

        if (!user_username || !user_password || !user_phone || !user_email || !role_id){
            return createError(ctx, 400, "กรอกข้อมูลให้ครบ")
        }

        const addUser = await prisma.users.create({
            data: {
                user_username,
                user_password,
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
        ctx.body = { message : "เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล" }
        console.log(err)
    }
}