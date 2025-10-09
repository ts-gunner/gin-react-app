// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加用户信息 POST /user/add */
export async function addSystemUser(
  body: API.AddSystemUserRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBool>('/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取登录用户信息 GET /user/get_info */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.ResponseResponseSystemUserVo>('/user/get_info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加用户信息 POST /user/get_page */
export async function getSystemUserPageData(
  body: API.SystemUserPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResponsePageResultResponseSystemUserPageVo>('/user/get_page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
