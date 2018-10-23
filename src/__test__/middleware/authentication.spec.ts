import * as expect from "expect";
import * as JWT from "jsonwebtoken";
import { B1imeUser } from "../../database/users";
import { verifyToken } from "../../middleware/authentication";

process.env.SECRET_KEY = "SECRET_KEY";
process.env.ACCESS_TOKEN_PREFIX = "Bearer";

const sampleUser: B1imeUser = {
  id: "1234",
  name: "이름"
};
const sampleToken = JWT.sign(sampleUser, "SECRET_KEY");

describe("Authentication Middleware 테스트", () => {
  describe("Token Verifier 테스트", () => {
    it("토큰과 prefix 가 올바를 시 사용자 이름을 리턴해야 함", () => {
      expect(verifyToken("Bearer", sampleToken)).toEqual("이름");
    });

    it("토큰이 올바르지 않을 시 에러를 발생시켜야 함", () => {
      expect(() => {
        verifyToken("Bearer", "incorrect_token");
      }).toThrow(Error);
    });

    it("prefix 가 올바르지 않을 시 에러를 발생시켜야 함", () => {
      expect(() => {
        verifyToken("not_a_prefix", sampleToken);
      }).toThrow(Error);
    });
  });

  // TODO 미들웨어 핸들러 테스트 추가
});
