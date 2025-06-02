import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Online Store API',
      version: '1.0.0',
      description: 'API documentation',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          description: 'User object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier of the user',
              example: 1,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com',
            },
            role_id: {
              type: 'integer',
              description: 'Role ID assigned to the user',
              example: 2,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the user was created',
              example: '2024-05-01T12:00:00Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the user was last updated',
              example: '2024-05-10T15:30:00Z',
            },
          },
        },
        UserInput: {
          type: 'object',
          description: 'Input schema for creating or updating a user',
          required: ['email', 'password', 'role_id'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'securepassword123',
            },
            role_id: {
              type: 'integer',
              description: 'Role ID assigned to the user',
              example: 2,
            },
          },
        },
        UserPatchInput: {
          type: 'object',
          description:
            "Input schema for partially updating a user's email or role",
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'New email address of the user',
              example: 'newemail@example.com',
            },
            role_id: {
              type: 'integer',
              description: 'New role ID assigned to the user',
              example: 3,
            },
          },
          additionalProperties: false,
        },
        Post: {
          type: 'object',
          description: 'Blog post object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier of the post',
              example: 10,
            },
            title: {
              type: 'string',
              description: 'Title of the post',
              example: 'My first post',
            },
            content: {
              type: 'string',
              description: 'Content body of the post',
              example: 'This is the body of the post...',
            },
            author_id: {
              type: 'integer',
              description: 'User ID of the author',
              example: 1,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the post was created',
              example: '2024-05-01T12:00:00Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the post was last updated',
              example: '2024-05-10T15:30:00Z',
            },
          },
        },
        PostInput: {
          type: 'object',
          description: 'Input schema for creating or updating a blog post',
          required: ['title', 'content', 'author_id'],
          properties: {
            title: {
              type: 'string',
              description: 'Title of the post',
              example: 'My first post',
            },
            content: {
              type: 'string',
              description: 'Content body of the post',
              example: 'This is the body of the post...',
            },
            author_id: {
              type: 'integer',
              description: 'User ID of the author',
              example: 1,
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
