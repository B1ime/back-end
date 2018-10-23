import { APIGatewayEvent, Context } from "aws-lambda";
import * as JWT from "jsonwebtoken";
import { B1imeUser } from "../database/users";

export interface AuthenticatedContext extends Context {
  user: string;
}

export const verifyToken = (prefix: string, token: string) => {
  const secretKey = process.env.SECRET_KEY as string;
  if (prefix !== process.env.ACCESS_TOKEN_PREFIX) {
    throw new Error("Prefix 가 올바르지 않습니다");
  }
  const payload = JWT.verify(token, secretKey) as B1imeUser;
  return payload.name;
};

/**
 * 사용자 인증 미들웨어. 인증 성공시 Lambda Context 에 'user' 키 추가
 * 실패 시 401 응답 바로 리턴
 * @param event: AWS API Gateway Event
 * @param context: Lambda Context
 * @param next: 다음 미들웨어
 */
export const AuthenticationMiddleware = (
  event: APIGatewayEvent,
  context: Context,
  next: any
) => {
  const errorResponse = {
    statusCode: 401,
    body: "Not authorized"
  };

  try {
    const { Authorization } = event.headers;
    const [prefix, token] = Authorization.split(" ");
    const user = verifyToken(prefix, token);
    const authorizedUserContext = { ...context, user };
    return next(event, authorizedUserContext);
  } catch (err) {
    return errorResponse;
  }
};
