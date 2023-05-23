import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosRequestHeaders,
  type AxiosResponse,
  AxiosError
} from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import { getToken, getTokenKey, removeToken } from './token'

declare type AxiosHeaders =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'

const config: {
  result_code: number | string
  unLogin_code: number | string
  default_headers: AxiosHeaders
  request_timeout: number
} = {
  /**
   * 接口成功返回状态码
   */
  result_code: 2000,

  /**
   * 登录失效状态码
   */

  unLogin_code: 2001,

  /**
   * 接口请求超时时间
   */
  request_timeout: 60000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (
      config.method === 'post' &&
      (config.headers as AxiosRequestHeaders)['Content-Type'] ===
        'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }

    config.headers[getTokenKey()] = getToken()
    // ;(config.headers as AxiosRequestHeaders)['Token'] = 'test test'
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response
    } else if (Number(response.data.code) === config.result_code) {
      return response.data
    } else if (Number(response.data.code) === config.unLogin_code) {
      removeToken()
      window.location.reload();
      return response.data
    } else {
      ElMessage.error(response.data.msg)
    }
  },
  (error: AxiosError) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

const { default_headers } = config

const request = (url: string, method: 'get' | 'post' | 'delete' | 'put', option: any) => {
  const { params, data, headersType, responseType } = option
  return service({
    url: url,
    method,
    params,
    data,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || default_headers
    }
  })
}
export default {
  get: <T = any>(url: string, option: any) => {
    return request(url, 'get', { ...option }) as unknown as T
  },
  post: <T = any>(url: string, option: any) => {
    return request(url, 'post', { data: option }) as unknown as T
  },
  delete: <T = any>(url: string, option: any) => {
    return request(url, 'delete', { data: option }) as unknown as T
  },
  put: <T = any>(url: string, option: any) => {
    return request(url, 'put', { ...option }) as unknown as T
  }
}
