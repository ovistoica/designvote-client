/* Type friendly api requests and handlers for success and error */

import axios, {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios'

const apiURL = process.env.REACT_APP_API_URL

export const apiClient = axios.create({
  baseURL: apiURL,
})

export function onRequestSuccess<Response = Record<string, unknown>>(
  response: AxiosResponse<Response>,
) {
  return response.data
}

export function onRequestError<Response = Record<string, unknown>>(
  error: AxiosError<Response>,
) {
  if (error.response && error.response.status === 401) {
    if (
      (apiClient as any).logout &&
      typeof (apiClient as any).logout === 'function'
    ) {
      ;(apiClient as any).logout().then(() => {
        // refresh the page for them
        window.location.assign(window.location.href)
        return Promise.reject({message: 'Please re-authenticate.'})
      })
    }
  }

  return Promise.reject(error)
}

export async function getRequest<Response = Record<string, unknown>>(
  url: string,
  config?: AxiosRequestConfig,
) {
  return apiClient
    .get<Response>(url, config)
    .then(onRequestSuccess)
    .catch(onRequestError)
}

export async function postRequest<
  Response = Record<string, unknown>,
  Body = Record<string, unknown>
>(url: string, data?: Body, config?: AxiosRequestConfig | undefined) {
  return apiClient
    .post<Response>(url, data, config)
    .then(onRequestSuccess)
    .catch(onRequestError)
}

export async function putRequest<
  Response = Record<string, unknown>,
  Body = Record<string, unknown>
>(url: string, data?: Body, config?: AxiosRequestConfig) {
  return apiClient
    .put<Response>(url, data, config)
    .then(onRequestSuccess)
    .catch(onRequestError)
}

export async function deleteRequest<Response = Record<string, unknown>>(
  url: string,
  config?: AxiosRequestConfig,
) {
  return apiClient
    .delete<Response>(url, config)
    .then(onRequestSuccess)
    .catch(onRequestError)
}

export async function patchRequest<
  Response = Record<string, unknown>,
  Body = Record<string, unknown>
>(url: string, data?: Body, config?: AxiosRequestConfig) {
  return apiClient
    .patch<Response>(url, data, config)
    .then(onRequestSuccess)
    .catch(onRequestError)
}
