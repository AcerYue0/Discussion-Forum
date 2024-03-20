import http from "./httpService";
import { api } from "../config.js";

export function createreply(commentbody, id) {
  return http.post(api.awsEndPoint, {
    Type: 1,
    UserId: "User_Id1",
    QuestionId: id,
    Content: commentbody,
    Timestamp: Date().valueOf()
  });
}
