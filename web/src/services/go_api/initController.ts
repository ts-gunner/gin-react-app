// @ts-ignore
/* eslint-disable */
import request from "@/utils/admin_request";

/** 查看是否需要初始化 GET /init/check */
export async function checkNeedInit(options?: { [key: string]: any }) {
  return request<API.ResponseResponseCheckResult>("/init/check", {
    method: "GET",
    ...(options || {}),
  });
}

/** 项目初始化 当配置文件的数据库配置为空时，需要进行项目初始化 POST /init/init_project */
export async function initProject(
  body: API.InitProjectRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseAny>("/init/init_project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 测试数据库是否能够连接 POST /init/test_db_connection */
export async function testDbConnection(
  body: API.DBConnectionRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseResponseCheckResult>("/init/test_db_connection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
