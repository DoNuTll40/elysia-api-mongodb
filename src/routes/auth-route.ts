import Elysia, { error } from "elysia";
import { signIn, signOut, signUp } from "../controller/auth-controller";
import jwt from "@elysiajs/jwt";
import { authenticate } from "../middleware/authenticate";

export const authRoute = (app: Elysia) => {
  app.group("/auth", (app) =>
    app
      .use(
        jwt({
          name: "jwt",
          secret: Bun.env.JWT_SECRET!,
        })
      )
      .post("/sign-up", signUp, {
        detail: {
          tags: ["Auth"],
          summary: "สมัครสมาชิก",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user_username: { type: "string" },
                    user_password: { type: "string" },
                    confirmPassword: { type: "string" },
                    user_email: { type: "string" },
                    user_phone: { type: "string" },
                  },
                  required: [
                    "user_username",
                    "user_password",
                    "user_email",
                    "user_phone",
                    "confirmPassword",
                  ],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Sign-up user successful!",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "object",
                        example: {
                          user_id: "string",
                          user_username: "string",
                          user_password: "string",
                          user_phone: "string",
                          user_email: "string",
                          user_create_at: "datetime",
                          role_id: "string",
                        },
                      },
                      status: { type: "integer", example: 200 },
                    },
                    required: ["result", "status"],
                  },
                },
              },
            },
            400: {
              description: "Bad Request - Invalid Input",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "string",
                        example: "รายละเอียดข้อผิดพลาด",
                      },
                      status: {
                        type: "integer",
                        example: 400,
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Sign-up internal server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "เกิดข้อผิดพลาดในการเชื่อมต่อ",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
      .post("/sign-in", signIn, {
        detail: {
          tags: ["Auth"],
          summary: "เข้าสู่ระบบ",
          description: "Authenticates a user and returns a session token.",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user_username: { type: "string" },
                    user_password: { type: "string" },
                  },
                  required: ["user_username", "user_password"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Successful sign-in",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "string",
                        example: "success!",
                      },
                      token: { type: "string" },
                      expiresIn: { type: "integer" },
                    },
                    required: ["token", "expiresIn"],
                  },
                },
              },
            },
            400: {
              description: "Invalid credentials or request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "string",
                        example: "Invalid username or password",
                      },
                      status: {
                        type: "integer",
                        example: 400,
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Sign-in internal server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "เกิดข้อผิดพลาดในการเชื่อมต่อ",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })

      .use(authenticate)

      .post("/sign-out", signOut, {
        detail: {
          tags: ["Auth"],
          summary: "ออกจากระบบ",
          description: "Authenticates a user and returns a session token.",
          security: [{
            bearerAuth: [],
          }],
          responses: {
            200: {
              description: "Successful sign-out",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "string",
                        example: "ออกจากระบบสำเร็จ!",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Sign-out internal server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "เกิดข้อผิดพลาดในการเชื่อมต่อ",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })

      .get("/me", ({ user, set }) => {
        if (!user) {
            set.status = 401;
            throw new Error("Unauthorized");
        }
    
        return {
            success: true,
            message: "Fetch authenticated user details",
            data: {
                user,
            },
        };
    }, {
        detail: {
            tags: ['Auth'],
            summary: 'เช็ค token',
            description: 'เช็ค token เพื่อดึงข้อมูลผู้ใช้ที่ได้รับการตรวจสอบสิทธิ์แล้ว',
            responses: {
                200: {
                    description: 'Successfully fetched user details',
                    content: {
                        'application/json': {
                            example: {
                                success: true,
                                message: "Fetch authenticated user details",
                                data: {
                                    user: {
                                        // ตัวอย่างข้อมูลผู้ใช้ที่ได้รับ
                                        id: 1,
                                        name: "John Doe",
                                        email: "john.doe@example.com"
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized - Missing or invalid token',
                    content: {
                        'application/json': {
                            example: {
                                success: false,
                                message: "Unauthorized",
                                data: null
                            }
                        }
                    }
                }
            },
            security: [{
                bearerAuth: [] // ใช้ bearerAuth เป็น security scheme สำหรับ header Authorization
            }],
        }
    })
  );
};
