import { DynamoDB } from "aws-sdk";

export interface B1imeUser {
  id: string;
  name: string;
}

interface UserORM {
  create: (user: B1imeUser) => Promise<DynamoDB.Types.PutItemOutput>;
}

const dynamoDB = new DynamoDB({ endpoint: "http://localhost:8000" });

export const B1imeUser: UserORM = {
  /**
   * 유저를 생성합니다. 이미 존재하는 유저의 경우 업데이트가 됩니다.
   * @param user: 유저의 id, 이름 정보
   * @return 생성된 유저 정보를 포함한 Promise
   */
  create: async user => {
    const params: DynamoDB.Types.PutItemInput = {
      TableName: "B1imeTable",
      Item: {
        id: { S: user.id },
        name: { S: user.name }
      },
      ReturnValues: "ALL_OLD"
    };
    return await dynamoDB.putItem(params).promise();
  },
};
