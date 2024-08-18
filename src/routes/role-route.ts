import Elysia from "elysia";
import {
  deleteRole,
  getRole,
  postRole,
  updateRole,
} from "../controller/role-controller";
import { authenticate } from "../middleware/authenticate";

export const roleRoute = (app: Elysia) => {
  app.group("/role", (app) =>
    app
      .use(authenticate)
      .get("/view", getRole, {
        detail: {
          tags: ["Role"],
          summary: "ดูตำแหน่ง",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "get role successful!",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "object",
                        example: {
                          role_id: "string",
                          role_type: "string",
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
              description: "view role internal server error",
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

      .post("/create", postRole, {
        detail: {
          tags: ["Role"],
          summary: "สร้างตำแหน่ง",
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
                    role_type: { type: "string" },
                  },
                  required: ["role_type"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "create role successful!",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "object",
                        example: {
                          role_id: "string",
                          role_type: "string",
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
              description: "internal server error",
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

      .patch("/update/:roleId", updateRole, {
        detail: {
          tags: ["Role"],
          summary: "อัพเดตตำแหน่ง",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Update role successful!",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "object",
                        example: {
                          role_id: "string",
                          role_type: "string",
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
              description: "internal server error",
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

      .delete("/delete/:roleId", deleteRole, {
        detail: {
          tags: ["Role"],
          summary: "ลบตำแหน่ง",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
                description: "Delete role successful!",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        result: {
                          type: "object",
                          example: {
                            role_id: "string",
                            role_type: "string",
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
                description: "Internal server error",
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
          }
        },
      })
  );
};
