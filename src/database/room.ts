import { DynamoDB } from "aws-sdk";

export interface RoomSetting {
  id: string;
  userId: string;
  place: {
    name: string;
    lati: string;
    longi: string;
  };
  roomName: string;
  quota: number;
  expireAt: number;
}

export class Room {
  private readonly db: DynamoDB = new DynamoDB({
    endpoint: process.env.DATABASE_HOST!
  });

  public async create(param: RoomSetting) {
    const params: DynamoDB.Types.PutItemInput = {
      TableName: "Room",
      Item: {
        id: { S: param.id },
        userId: { S: param.userId },
        roomName: { S: param.roomName },
        quota: { N: param.quota.toString() },
        expireAt: { N: param.expireAt.toString() },
        place: { M: {
          name: { S: param.place.name },
          lati: { S: param.place.lati },
          longi: { S: param.place.longi }
        }},
      },
      ReturnValues: "ALL_OLD"
    };
    return await this.db.putItem(params).promise();
  }

  // TODO
  public async getRoomList(userId?: string) {
    const params: DynamoDB.Types.ScanInput = {
      TableName: "Room",
      FilterExpression: "userId"
    };
    return await this.db.scan(params).promise();
  }
}
