import {server, rest} from 'test/server'
import {client} from '../api-client'

const apiURL = process.env.REACT_APP_API_URL

test('calls fetch at the endpoint with the arguments for GET requests', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )
  const result = await client(endpoint)
  expect(result).toEqual(result)
})

test('adds auth token when a token is provided', async () => {
  const token = 'FAKE_TOKEN'
  const endpoint = 'test-endpoint'
  let request
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )
  await client(endpoint, {token})
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})

test('allows for config overrides', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  let request
  const customConfig = {method: 'PUT', headers: {'Content-Type': 'fake-type'}}
  server.use(
    rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )
  await client(endpoint, customConfig)
  expect(request.headers.get('Content-Type')).toBe(
    customConfig.headers['Content-Type'],
  )
})

test('when data is provided, it is stringified and the method defaults to POST', async () => {
  const mockData = {fake: 'FAKE_DATA'}
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  let request
  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )
  await client(endpoint, {data: mockData})
  expect(request.body).toEqual(mockData)
})
