import Elysia from "elysia";
import prisma from "../config/prisma";
const jwt = require('jsonwebtoken');

export const authenticate = (app: Elysia) => 
    app.derive(async ({ request, set, cookie }) => {
        const token = request.headers.get("Authorization") || cookie.accessToken.value;

        if (!token) {
            set.status = 401;
            throw new Error("Unauthorized"); // Throw an error to stop further processing
        }

        if (!token.startsWith("Bearer ")) {
            set.status = 400;
            throw new Error("Authorization is not bearer"); // Throw an error to stop further processing
        }

        const accessToken = token.split("Bearer ")[1];

        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            const user = await prisma.users.findFirst({
                where: {
                    id: decoded.userId
                },
                select: {
                    id: true,
                    user_code: true,
                    user_username: true,
                    user_email: true,
                    user_phone: true,
                    user_create_at: true,
                    role: true
                }
            });

            if (!user) {
                set.status = 401;
                throw new Error("Unauthorized"); // Throw an error to stop further processing
            }

            return {
                user,
            };
        } catch (err) {
            console.log(err)
            set.status = 401;
            throw new Error("Invalid token"); // Throw an error to stop further processing
        }
    });
