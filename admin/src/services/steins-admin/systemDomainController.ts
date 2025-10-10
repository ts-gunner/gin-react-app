// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加域 POST /domain/add */
export async function addSystemDomain(
  body: API.AddDomainRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBool>('/domain/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取域的页数据 POST /domain/get_page */
export async function getDomainInfoPage(
  body: API.SystemDomainPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResponsePageResultSchemaSystemDomain>('/domain/get_page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取域列表 GET /domain/list_domains */
export async function listDomains(options?: { [key: string]: any }) {
  return request<API.ResponseArraySchemaSystemDomain>('/domain/list_domains', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除域信息 POST /domain/remove */
export async function removeDomainInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeDomainInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBool>('/domain/remove', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新域信息 POST /domain/update */
export async function updateDomainInfo(
  body: API.UpdateDomainRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBool>('/domain/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
