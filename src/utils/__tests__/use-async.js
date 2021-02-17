import {renderHook, act} from '@testing-library/react-hooks'
import {useAsync} from '../hooks'

// resolve promises imperatively
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

function getAsyncState(overrides = {}) {
  return {
    isIdle: true,
    isError: false,
    isLoading: false,
    isSuccess: false,
    data: null,
    error: null,
    status: 'idle',

    run: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
    reset: expect.any(Function),
    ...overrides,
  }
}

beforeEach(() => {
  jest.spyOn(console, 'error')
})

afterEach(() => {
  console.error.mockRestore()
})

test('calling run with a promise which resolves', async () => {
  const {promise, resolve} = deferred()

  const {result} = renderHook(() => useAsync())
  expect(result.current).toEqual(getAsyncState())

  let p
  act(() => {
    p = result.current.run(promise)
  })
  expect(result.current).toEqual(
    getAsyncState({
      status: 'pending',
      isLoading: true,
      isIdle: false,
    }),
  )

  const resolvedValue = Symbol('Resolved value')

  await act(async () => {
    resolve(resolvedValue)
    await p
  })

  expect(result.current).toEqual(
    getAsyncState({
      status: 'resolved',
      data: resolvedValue,
      isIdle: false,
      isSuccess: true,
    }),
  )
  act(() => {
    result.current.reset()
  })
  expect(result.current).toEqual(getAsyncState())
})

test('calling run with a promise which rejects', async () => {
  const {promise, reject} = deferred()

  const {result} = renderHook(() => useAsync())
  expect(result.current).toEqual(getAsyncState())

  let p
  act(() => {
    p = result.current.run(promise).catch(() => {
      // reject value
    })
  })

  expect(result.current).toEqual(
    getAsyncState({isLoading: true, isIdle: false, status: 'pending'}),
  )

  const rejectedValue = Symbol('Rejected value')
  await act(async () => {
    reject(rejectedValue)
    await p
  })
  expect(result.current).toEqual(
    getAsyncState({
      status: 'rejected',
      error: rejectedValue,
      isError: true,
      isLoading: false,
      isIdle: false,
    }),
  )
})

test('can specify an initial state', async () => {
  const data = Symbol('resolved')
  const customInitialState = {data, status: 'resolved'}
  const {result} = renderHook(() => useAsync(customInitialState))

  expect(result.current).toEqual(
    getAsyncState({...customInitialState, isIdle: false, isSuccess: true}),
  )
})

test('can set the data', async () => {
  const {result} = renderHook(() => useAsync())
  expect(result.current).toEqual(getAsyncState())

  const newData = Symbol('new data')
  act(() => result.current.setData(newData))
  expect(result.current).toEqual(
    getAsyncState({
      data: newData,
      status: 'resolved',
      isIdle: false,
      isSuccess: true,
    }),
  )
})

test('can set the error', async () => {
  const {result} = renderHook(() => useAsync())
  expect(result.current).toEqual(getAsyncState())

  const testError = Symbol('Oops! Error')
  act(() => result.current.setError(testError))

  expect(result.current).toEqual(
    getAsyncState({
      status: 'rejected',
      error: testError,
      isError: true,
      isIdle: false,
    }),
  )
})

test('No state updates happen if the component is unmounted while pending', async () => {
  const {promise, resolve} = deferred()
  const {result, unmount} = renderHook(() => useAsync())

  let p
  act(() => {
    p = result.current.run(promise)
  })
  unmount()

  await act(async () => {
    resolve()
    await p
  })

  expect(console.error).not.toHaveBeenCalled()
})

test('calling "run" without a promise results in an early error', async () => {
  const {result} = renderHook(() => useAsync())

  expect(result.current.run).toThrowErrorMatchingInlineSnapshot(
    `"The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?"`,
  )
})
