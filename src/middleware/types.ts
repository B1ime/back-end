import { APIGatewayEvent, Context, Handler } from "aws-lambda";

export type Middleware = (
  event: APIGatewayEvent,
  context: Context,
  next: Handler
) => any;

export type MiddlewareApplier = (
  handler: PromiseHandler,
  middlewares: Middleware[]
) => PromiseHandler;

export type PromiseHandler<Event = any, Result = any> = (
  event: Event,
  context: Context
) => Promise<Result>;
