import Elysia, { error } from "elysia";
import { signUp } from "../controller/auth-controller";

export const authRoute = (app: Elysia) => {
  app.group("/auth", (app) =>
    app
      .post("/sign-up", signUp, {
        detail: {
          tags: ["Auth"],
          summary: 'สมัครสมาชิก',
          requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            user_username: { type: 'string'},
                            user_password: { type: 'string'},
                            user_email: { type: 'string'},
                            user_phone: { type: 'string'},
                        },
                        required: ['user_username', 'user_password', 'user_email', 'user_phone']
                    }
                }
            }
          },
          responses: {
            200: {
                description: 'Sign-up user successful!',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                result: {
                                    type: 'object',
                                    example: {
                                        user_id: 'string',
                                        user_username: 'string',
                                        user_password: 'string',
                                        user_phone: 'string',
                                        user_email: 'string',
                                        user_create_at: 'datetime',
                                        role_id: 'string'
                                    }
                                },
                                status: { type: 'integer', example: 200 }
                            },
                            required: ['result', 'status']
                        }
                    }
                }
            },
            400: {
                description: 'Bad Request - Invalid Input',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                result: {
                                    type: 'string',
                                    example: 'รายละเอียดข้อผิดพลาด'
                                },
                                status: {
                                    type: 'integer',
                                    example: 400,
                                }
                            }
                        }
                    }
                }
            },
            500: {
                description: 'Sign-up internal server error',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: 'เกิดข้อผิดพลาดในการเชื่อมต่อ'
                                }
                            }
                        }
                    }
                }
            }
          }
        },
      })
      .post("/sign-in", () => 1234567, {
        detail: {
          tags: ["Auth"],
          summary: 'เข้าสู่ระบบ',
          description: 'Authenticates a user and returns a session token.',
          requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            user_username: { type: 'string' },
                            user_password: { type: 'string' }
                        },
                        required: ['user_username', 'user_password']
                    }
                }
            }
        },
          responses: {
            200: {
                description: 'Successful sign-in',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                result: {
                                    type: 'string',
                                    example: "success!"
                                },
                                token: { type: 'string' },
                                expiresIn: { type: 'integer' }
                            },
                            required: ['token', 'expiresIn']
                        }
                    }
                }
            },
            400: {
                description: 'Invalid credentials or request',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                result: {
                                    type: 'string',
                                    example: 'Invalid username or password'
                                },
                                status: {
                                    type: 'integer',
                                    example: 400
                                }
                            }
                        }
                    }
                }
            },
            500: {
                description: 'Sign-up internal server error',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: 'เกิดข้อผิดพลาดในการเชื่อมต่อ'
                                }
                            }
                        }
                    }
                }
            }
        }},
      })
  );
};
