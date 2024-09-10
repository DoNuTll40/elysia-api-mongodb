
import { Context } from "elysia";
import prisma from "../config/prisma";
import { createError } from "../util/createError";
import { userRequestBody } from "../interface/interface";
const crypto = require('crypto-js')

export const getUser = async (ctx: Context) => { // ctx เป็นชื่อตัวแปร ย่อมาจาก Context
    const rs = await prisma.users.findMany({
        include: {
            role: true,
            userImage: true,
        }
    })
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

        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const currentDate = `${year}${month}${day}`;
        
        const numberUserCount = await prisma.users.count();
        const userId = `USER${currentDate}${numberUserCount + 1}`;

        const addUser = await prisma.users.create({
            data: {
                user_code: userId,
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
        ctx.set.status = 500
        return { message : "เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล" }
    }
}

export const updateUser = async (ctx: Context) => {
    try {
        const { userId } = ctx.params;

        const body: unknown = ctx.body;

        const { user_username, user_password, user_phone, user_email, role_id } = body as userRequestBody;

        if (!user_username || !user_password || !user_phone || !user_email || !role_id){
            return createError(ctx, 400, "กรอกข้อมูลให้ครบ")
        }

        if(!userId){
            return createError(ctx, 400, "โปรดป้อนข้อมูลหมายเลขไอดี")
        }

        if (!/^[a-fA-F0-9]{24}$/.test(userId)) {
            return createError(ctx, 400, "รูปแบบหมายเลขไอดีไม่ถูกต้อง");
        }

        const checkUserId = await prisma.users.findFirst({
            where: { id: userId }
        })

        const checkUsername = await prisma.users.findFirst({
            where: { user_username, NOT: { id: userId } },
        })

        const checkPhone = await prisma.users.findFirst({
            where: { user_phone, NOT: { id: userId } }
        })

        const checkEmail = await prisma.users.findFirst({
            where: { user_email, NOT: { id: userId } }
        })

        if(!checkUserId){
            return createError(ctx, 400, "ไม่พบหมายเลขไอดีนี้ในระบบ")
        }

        if(checkUsername){
            return createError(ctx, 400, "มีผู้ใช้งานชื่อนี้แล้ว")
        }

        if(checkPhone){
            return createError(ctx, 400, "มีผู้ใช้งานเบอร์โทรนี้แล้ว")
        }

        if(checkEmail){
            return createError(ctx, 400, "มีผู้ใช้งานอีเมลนี้แล้ว")
        }

        let hashPassowrd = ""

        if(checkUserId.user_password !== user_password){
            hashPassowrd = crypto.AES.encrypt(user_password, process.env.CRYPTO_SECRET).toString();
        }else{
            hashPassowrd = user_password
        }

        const updateU = await prisma.users.update({
            where: {
                id: userId
            },
            data: {
                user_username,
                user_password: hashPassowrd,
                user_email,
                user_phone,
                role_id,
            }
        })

        ctx.set.status = 200
        return {
            result: {
                updateU
            },
            status: 200
        }

    }catch(err){
        console.log(err)
        ctx.set.status = 500
        return { message : "เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล" }
    }
}

export const deleteUser = async (ctx: Context) => {
    try {
        const { userId } = ctx.params;

        if(!userId){
            return createError(ctx, 400, "โปรดป้อนข้อมูลหมายเลขไอดี")
        }

        if (!/^[a-fA-F0-9]{24}$/.test(userId)) {
            return createError(ctx, 400, "รูปแบบหมายเลขไอดีไม่ถูกต้อง");
        }

        const checkUserId = await prisma.users.findFirst({
            where: { id: userId }
        })

        if(!checkUserId){
            return createError(ctx, 400, "ไม่พบหมายเลขไอดีนี้ในระบบ")
        }

        const deleteU = await prisma.users.delete({
            where: { id: userId }
        })

        ctx.set.status = 200
        return {
            result: {
                deleteU
            },
            status: 200
        }

    }catch(err){
        console.log(err)
        ctx.set.status = 500
        return { message : "เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล" }
    }
}