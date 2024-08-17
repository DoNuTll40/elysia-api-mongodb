import { Context } from "elysia";

export const authenticate = async (ctx: Context) => {
    try {
        const token = ctx.request.headers.get("Authorization");
    }catch(err){
        ctx.set.status = 400
        console.log(err)
        return {
            message: "ไม่สามารถ authenticate ได้"
        }
    }
}