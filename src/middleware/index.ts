import { APIGatewayEvent, Context } from "aws-lambda";
import { Middleware, MiddlewareApplier, PromiseHandler } from "./types";

/**
 * handler 에 미들웨어를 순차적으로 적용
 * @param handler: 람다 핸들러
 * @param middlewares: 순차적으로 적용할 미들웨어들
 * @return 미들웨어 적용이 완료된 핸들러
 */
const applyMiddlewares: MiddlewareApplier = (handler, middlewares) => {
  const [firstMiddleware, ...restOfMiddlewares] = middlewares;
  if (firstMiddleware) {
    return (event: APIGatewayEvent, context: Context) => {
      try {
        return firstMiddleware(
          event,
          context,
          applyMiddlewares(handler, restOfMiddlewares)
        );
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  return handler;
};

/**
 * handler 에 미들웨어 적용 완료 후 실행시키는 헬퍼 함수 (핸들러)
 * @param handler: 람다 핸들러
 * @param middlewares
 */
export const withMiddlewares = (
  handler: PromiseHandler,
  middlewares: Middleware[]
) => async (event: APIGatewayEvent, context: Context) => {
  const middlewareAppliedHandler = applyMiddlewares(handler, middlewares);
  return middlewareAppliedHandler(event, context);
};
