export default {
  swagger: "2.0",
  info: {
    title: "Deal",
    description:
      "Built using express (node.js) with MongoDB.\n\nThis API provides basic CRUD access on User.\n\nUser have two different roles: **Admin** and **User.**\n\n1.  **Admin**  \n    Can access all User CRUD endpoints.\n2.  **User**  \n    Can only access his/her own data. Can only hit `/users/{ownId}`",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/",
  tags: [
    {
      name: "Users",
      description: "API for users in the system",
    },
  ],
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/users": {
      parameters: [
        {
          name: "x-access-token",
          in: "header",
          schema: {
            type: "string",
          },
          example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc2NTJlN2Q3NzRiMWIxZWMzZTM1YWYiLCJpYXQiOjE2Njg2OTk2MTEsImV4cCI6MTY2ODcwMzIxMX0.UOkmYIYWp5TR2TepRzHj17jy87B1smp9Yb26EzEkuIY",
        },
      ],
      get: {
        tags: ["Users"],
        summary: "Get all users in system",

        responses: {
          200: {
            description: "OK, User list fetched.",
          },
          401: {
            description:
              "Unauthorized, Access Token invalid / Do not have access (not admin)",
          },
          403: {
            description: "X-Access-Token header not provided",
          },
          502: {
            description: "Bad Gateway.",
          },
        },
      },
      post: {
        tags: ["Users"],
        description: "Create new user in system",
        parameters: [
          {
            name: "user",
            in: "body",
            description: "User that we want to create",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          200: {
            description: "New user created.",
          },
          401: {
            description:
              "Unauthorized, Access Token invalid / Do not have access (not admin)",
          },
          403: {
            description: "X-Access-Token header not provided",
          },
          502: {
            description: "Bad Gateway.",
          },
        },
      },
    },
    "/users/{id}": {
      parameters: [
        {
          name: "x-access-token",
          in: "header",
          schema: {
            type: "string",
          },
          example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc2NTJlN2Q3NzRiMWIxZWMzZTM1YWYiLCJpYXQiOjE2Njg2OTk2MTEsImV4cCI6MTY2ODcwMzIxMX0.UOkmYIYWp5TR2TepRzHj17jy87B1smp9Yb26EzEkuIY",
        },
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID of user to be fetch",
          type: "integer",
        },
      ],
      get: {
        summary: "Get detail of user with given ID",
        tags: ["Users"],
        responses: {
          200: {
            description: "User detail fetched.",
          },
          401: {
            description:
              "Unauthorized, Access Token invalid / Do not have access (not admin/ not current user data)",
          },
          403: {
            description: "X-Access-Token header not provided",
          },
          502: {
            description: "Bad Gateway.",
          },
        },
      },
      delete: {
        summary: "Delete user with given ID",
        tags: ["Users"],
        responses: {
          200: {
            description: "User is deleted",
          },
          401: {
            description:
              "Unauthorized, Access Token invalid / Do not have access (not admin)",
          },
          403: {
            description: "X-Access-Token header not provided",
          },
          502: {
            description: "Bad Gateway.",
          },
        },
      },
      patch: {
        summary: "Update user with given ID",
        tags: ["Users"],
        parameters: [
          {
            name: "user",
            in: "body",
            description: "User with new values of properties",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        responses: {
          200: {
            description: "User is updated",
          },
          401: {
            description:
              "Unauthorized, Access Token invalid / Do not have access (not admin)",
          },
          403: {
            description: "X-Access-Token header not provided",
          },
          502: {
            description: "Bad Gateway.",
          },
        },
      },
    },
    "/refreshToken": {
      get: {
        summary: "Get all current available refresh token",
        tags: ["Refresh Token"],
        responses: {
          200: {
            description: "Refresh token list fetched.",
          },
          204: {
            description: "No content.",
          },
          502: {
            description: "Bad Gateway.",
          },
        },
      },
      post: {
        parameters: [
          {
            name: "refreshToken",
            in: "body",
            description: "RefreshToken",
            type: "string",
          },
        ],
        summary: "Fetch new jwt token using refresh token",
        tags: ["Refresh Token"],
        responses: {
          200: {
            description: "New JWT token fetched.",
          },
          403: {
            description: "Refresh token not provided in request body/ EXPIRED.",
          },
          404: {
            description: "Refresh token not found in database.",
          },
          502: {
            description: "Bad Gateway",
          },
        },
      },
    },
  },
  definitions: {
    User: {
      required: ["_id", "username", "email", "password"],
      properties: {
        _id: {
          type: "integer",
          uniqueItems: true,
        },
        username: {
          type: "string",
          uniqueItems: true,
        },
        email: {
          type: "string",
          uniqueItems: true,
        },
        password: {
          type: "string",
        },
      },
    },
    RefreshToken: {
      required: ["_id", "token", "expiryDate", "userId"],
      properties: {
        _id: {
          type: "integer",
          uniqueItems: true,
        },
        token: {
          type: "string",
          uniqueItems: true,
        },
        expiryDate: {
          type: "date",
        },
        userId: {
          type: "string",
        },
      },
    },
  },
};
