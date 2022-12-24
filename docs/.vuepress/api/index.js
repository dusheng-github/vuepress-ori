import request from "../utils/request";

// 文件上传
export function uploadFile(query) {
  console.log(query, request);
    return request({
      url: "/common/upload",
      method: "post",
      data: query,
    });
  }