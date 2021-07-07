/* Type friendly api requests and handlers for success and error */

import axios, {AxiosResponse, AxiosRequestConfig} from 'axios'

export function onRequestSuccess<Response = Record<string, unknown>>(
  response: AxiosResponse<Response>,
) {
  return response.data
}

export async function getRequest<Response = Record<string, unknown>>(
  url: string,
  config: AxiosRequestConfig = {},
) {
  return axios
    .get<Response>(url, {withCredentials: true, ...config})
    .then(onRequestSuccess)
}

export async function postRequest<
  Response = Record<string, unknown>,
  Body = Record<string, unknown>
>(url: string, data?: Body, config?: AxiosRequestConfig | undefined) {
  return axios.post<Response>(url, data, config).then(onRequestSuccess)
}

export async function putRequest<
  Response = Record<string, unknown>,
  Body = Record<string, unknown>
>(url: string, data?: Body, config?: AxiosRequestConfig) {
  return axios.put<Response>(url, data, config).then(onRequestSuccess)
}

export async function deleteRequest<Response = Record<string, unknown>>(
  url: string,
  config?: AxiosRequestConfig,
) {
  return axios.delete<Response>(url, config).then(onRequestSuccess)
}

export async function patchRequest<
  Response = Record<string, unknown>,
  Body = Record<string, unknown>
>(url: string, data?: Body, config?: AxiosRequestConfig) {
  return axios.patch<Response>(url, data, config).then(onRequestSuccess)
}
