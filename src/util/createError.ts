
import { Context } from "elysia";

export const createError = (ctx: Context, statusCode: number, message: string) => {
    ctx.set.status = statusCode; // ตั้งค่าสถานะ
    return {
        result: message, // ข้อความที่ต้องการส่งคืน
        status: statusCode // สถานะที่ต้องการส่งคืน
    };
};