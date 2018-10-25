import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";

import { Room, RoomSetting } from "../../database/room";
import { withMiddlewares } from "../../middleware";
import { AuthenticationMiddleware } from "../../middleware/authentication";
import { PromiseHandler } from "../../middleware/types";

// TODO
export const getRoomList: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  // try {
  //   const { id, userId } = event.queryStringParameters!;
  //   const result = await new Room().getRoomList({ id, userId});
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({
  //       body: result
  //     })
  //   };
  // } catch (err) {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({
  //       message: err
  //     })
  //   };
  // }
};

export const createRoomHandler: PromiseHandler = async (event: APIGatewayEvent, context: Context) => {
  try {
    const roomSetting = JSON.parse(event.body as string) as RoomSetting;
    await new Room().create(roomSetting);
    return {
      statusCode: 201,
      body: JSON.stringify({
        id: roomSetting.id
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err
      })
    };
  }
};

export const createRoom = withMiddlewares(createRoomHandler, [AuthenticationMiddleware]);
