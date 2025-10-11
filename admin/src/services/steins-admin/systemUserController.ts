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

/** 删除用户信息 POST /user/remove */
export async function removeSystemUserInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeSystemUserInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBool>('/user/remove', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 重置用户密码 POST /user/reset_pwd */
export async function resetUserPassword(
  body: API.ResetUserPwdRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBool>('/user/reset_pwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户信息 POST /user/update */
export async function updateSystemUserInfo(
  body: API.UpdateSystemUserRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBool>('/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
