import { APIGatewayEvent, Context, Handler } from "aws-lambda";
import * as JWT from "jsonwebtoken";
import { B1imeUser, User } from "../../database/users";

/**
 * 유저 로그인 핸들러
 * @param event: AWS API Gateway Event. Body 에 {id: 1234, name: "이름"} 형식의 JSON 을 포함해야 함.
 * @param context: AWS Lambda Context
 * @return HTTP 201 if success, 400 if fail. Response body 에는 name 과 JWT Token 이 포함됨.
 */
export const login: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  try {
    const user: B1imeUser = JSON.parse(event.body as string);
    await new User().create(user);
    const token = JWT.sign(user, process.env.SECRET_KEY as string);
    return {
      statusCode: 201,
      body: JSON.stringify({ name: user.name, token })
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: `Bad Request: ${err}`
    };
  }
};
