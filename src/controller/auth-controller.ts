import { Context } from "elysia";
import { userRequestBody } from "../interface/interface";
import { createError } from "../util/createError";
import prisma from "../config/prisma";
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')

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

        const hashPassowrd = crypto.AES.encrypt(user_password, process.env.CRYPTO_SECRET).toString();

        const addUser = await prisma.users.create({
            data: {
                user_username,
                user_password: hashPassowrd,
                user_phone,
                user_email,
                role_id: "66c03963300fe981eccd18f4"
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

export const signIn = async (ctx: Context) => {
    try {
        const body: unknown = ctx.body;

        const { user_username, user_password, confirmPassword } = body as userRequestBody;

        if(!user_username || !user_password || !confirmPassword){
            return createError(ctx, 400, "ป้อนข้อมูลให้ครบ")
        }

        if(user_password !== confirmPassword){
            return createError(ctx, 400, "รหัสผ่านไม่ตรงกัน, โปรดลองใหม่")
        }

        const checkUsername = await prisma.users.findFirst({
            where: {
                user_username,
            },
            include: {
                role: true
            }
        })

        if(!checkUsername){
            return createError(ctx, 400, "ไม่พบชื่อผู้ใช้งานในระบบ")
        }

        const checkPassword = await prisma.users.findFirst({
            where: {
                user_username
            }
        })

        const decode = crypto.AES.decrypt(checkPassword?.user_password, process.env.CRYPTO_SECRET)
        const originalPassowrd = decode.toString(crypto.enc.Utf8)

        if(user_password !== originalPassowrd){
            return createError(ctx, 400, "รหัสผ่านไม่ถูกต้อง, โปรดลองใหม่")
        }

        const accessToken = await jwt.sign({
            result: {
                userId: checkUsername.user_id,
                username: user_username,
                email: checkUsername.user_email,
                phone: checkUsername.user_phone,
                role: checkUsername.role.role_type
            },
            create_at: new Date().toLocaleDateString('th-TH'),
            success: true,
            code: 200
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN! });

        return {
            result: 'success!',
            token: accessToken,
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