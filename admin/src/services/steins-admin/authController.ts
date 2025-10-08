// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 管理端密码登录 POST /auth/admin_pwd_login */
export async function adminPwdLogin(body: API.PwdLogin, options?: { [key: string]: any }) {
  return request<API.ResponseResponseSystemUserVo>('/auth/admin_pwd_login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户退出登录 POST /auth/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.ResponseAny>('/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 用户端密码登录 POST /auth/pwd_login */
export async function userPwdLogin(options?: { [key: string]: any }) {
  return request<API.ResponseAny>('/auth/pwd_login', {
    method: 'POST',
    ...(options || {}),
  });
}
