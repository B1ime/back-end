import { DynamoDB } from "aws-sdk";

export interface B1imeUser {
  id: string;
  name: string;
}

export class User {
  private readonly endpoint: string = process.env.DATABASE_HOST as string;
  private readonly db: DynamoDB = new DynamoDB({
    endpoint: this.endpoint
  });

  /**
   * 유저를 생성합니다. 이미 존재하는 유저의 경우 업데이트가 됩니다.
   * @param user: 유저의 id, 이름 정보
   * @return 생성된 유저 정보를 포함한 Promise
   */
  public async create(user: B1imeUser) {
    const params: DynamoDB.Types.PutItemInput = {
      TableName: "B1imeTable",
      Item: {
        id: { S: user.id },
        name: { S: user.name }
      },
      ReturnValues: "ALL_OLD"
    };
    return await this.db.putItem(params).promise();
  }
}
