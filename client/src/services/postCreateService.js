import http from "./httpService";
import { api } from "../config.js";

export function createpost(postbody) {
  console.log(api.awsEndPoint);
  return http.post(api.awsEndPoint, {
    Type: 0,
    UserId: "User_Id1",
    QuestionId: "Question_Id1",
    Content: postbody,
    Timestamp: Date().valueOf()
  });
}