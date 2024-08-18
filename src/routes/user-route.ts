import Elysia from "elysia";
import { getUser, postUser } from "../controller/user-controller";
import { authenticate } from "../middleware/authenticate";

export const userRoute = (app: Elysia) =>
  app.group("/user", (app) =>
    app
      .use(authenticate)
      .get("/view", getUser, {
        detail: {
          tags: ["User"],
          summary: "ดูข้อมูลผู้ใช้งาน",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "create user successful!",
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
              description: "view user internal server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
      .post("/create", postUser, {
        detail: {
          tags: ["User"],
          summary: "เพิ่มผู้ใช้งาน",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user_username: { type: "string" },
                    user_password: { type: "string" },
                    user_email: { type: "string" },
                    user_phone: { type: "string" },
                    role_id: { type: "string" },
                  },
                  required: [
                    "user_username",
                    "user_password",
                    "user_email",
                    "user_phone",
                    "role_id",
                  ],
                },
              },
            },
          },
          responses: {
            200: {
              description: "create user successful!",
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
              description: "create user internal server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
  );
