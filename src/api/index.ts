import { APIGatewayEvent, Context, Handler } from "aws-lambda";

export const hello: Handler = async (event: APIGatewayEvent, context: Context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
      input: event,
    }),
  };
};
