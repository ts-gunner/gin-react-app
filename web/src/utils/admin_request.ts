import { extend } from 'umi-request';
import { toast } from 'sonner';
import { history as umiHistory } from "umi"
import { APPLICATION_CONFIG } from '@/constants/config';
const request = extend({
  prefix: APPLICATION_CONFIG.BACKEND_URL, // 基础路径
  timeout: 300000,
  errorHandler: (error) => {
    if (!error.response) {
      toast.error("服务器连接异常")
    }
    throw error;
  }
});

// 请求拦截器
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: token,
    };
  }
  return { url, options };
});

// 响应拦截器
request.interceptors.response.use(async (response) => {
  const contentType = response.headers.get('Content-Type');

  // 处理文件下载响应
  if (
    contentType &&
    (contentType.includes('application/octet-stream') ||
      contentType.includes('application/vnd.ms-excel') ||
      contentType.includes('application/pdf') ||
      contentType.includes('image/'))
  ) {
    return {
      code: 200,
      data: await response.blob(),
      msg: "成功"
    };
  }
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    if (data.code === 401) {
      toast.error("身份校验失败，请重新登录")
      localStorage.removeItem("token")
      umiHistory.push("/login")
    }
    return data;
  }

});

export default request;