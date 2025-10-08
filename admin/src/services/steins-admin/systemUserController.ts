// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取登录用户信息 GET /user/get_info */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.ResponseResponseSystemUserVo>('/user/get_info', {
    method: 'GET',
    ...(options || {}),
  });
}
