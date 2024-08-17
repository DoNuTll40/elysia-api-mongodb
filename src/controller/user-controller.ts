
import { Context } from "elysia";
import prisma from "../config/prisma";

export const userController = async (ctx: Context) => { // ctx เป็นชื่อตัวแปร ย่อมาจาก Context
    const rs = await prisma.users.findMany()
    console.log(rs)
    if(rs.length !== 0){
        return { result: rs }
    }else{
        return {
            message: "ไม่พบข้อมูล"
        }
    }
}