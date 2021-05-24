import {ApiConfig} from 'types'

const apiURL = process.env.REACT_APP_API_URL

async function client<Result = unknown, Data = unknown>(
  endpoint: string,
  {
    data,
    token,
    logout,
    headers: customHeaders,
    ...customConfig
  }: ApiConfig<Data> = {},
): Promise<Result> {
  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      if (logout) {
        await logout()
      }
      // refresh the page for them
      window.location.assign(window.location.href)
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const textData = await response.text()
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const data = textData ? JSON.parse(textData) : {}
    if (response.ok) {
      return data
    }
    return Promise.reject(data)
  })
}

export {client}
