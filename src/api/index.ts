import { APIGatewayEvent, Context, Handler } from "aws-lambda";
import { withMiddlewares } from "../middleware";
import {
  AuthenticatedContext,
  AuthenticationMiddleware
} from "../middleware/authentication";
import { PromiseHandler } from "../middleware/types";

export const hello: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
      input: event
    })
  };
};

/**
 * Test handler with middleware
 */
const testHandler: PromiseHandler = async (
  event: APIGatewayEvent,
  context: AuthenticatedContext
) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Test",
      user: context.user
    })
  };
};

export const test = withMiddlewares(testHandler, [AuthenticationMiddleware]);
