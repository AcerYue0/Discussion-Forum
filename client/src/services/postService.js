import http from "./httpService.js";
import { api } from "../config.js";

export function createpost(user, postbody, id, type) {
  console.log(api.awsEndPoint);
  return http.post(api.awsEndPoint, {
    Type: type,
    UserId: user,
    QuestionId: "Question_Id" + id,
    Content: postbody,  
    Timestamp: Date().valueOf()
  });
}