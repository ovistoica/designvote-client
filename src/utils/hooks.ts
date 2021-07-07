import * as React from 'react'

import {useBreakpoint} from '@chakra-ui/react'

import {useDesigns} from './design-query'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import axios from 'axios'
import {useUser} from '../store/user'

export function useSafeDispatch<Value = unknown>(
  dispatch: React.Dispatch<Value>,
) {
  const mounted = React.useRef(false)
  React.useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return React.useCallback(
    (value: Value) => (mounted.current ? dispatch(value) : undefined),
    [dispatch],
  )
}

export enum ApiStatus {
  Idle = 'idle',
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected',
}

interface AsyncState<Data = unknown> {
  data?: Data
  error?: string
  status: ApiStatus
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
export function useAsync<Result = unknown>(
  initialState: AsyncState<Result> = {
    status: ApiStatus.Idle,
    data: undefined,
    error: undefined,
  },
) {
  const initialStateRef = React.useRef({
    ...initialState,
  })
  const [{status, data, error}, setState] = React.useReducer(
    (s: AsyncState<Result>, a: AsyncState<Result>) => ({...s, ...a}),
    initialStateRef.current,
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = React.useCallback(
    (newData: Result) =>
      safeSetState({data: newData, status: ApiStatus.Resolved}),
    [safeSetState],
  )
  const setError = React.useCallback(
    e => safeSetState({error: e, status: ApiStatus.Rejected}),
    [safeSetState],
  )
  const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
    safeSetState,
  ])

  const run = React.useCallback(
    (promise: Promise<Result>) => {
      if (!promise || !promise.then) {
        throw new Error(
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
        )
      }
      safeSetState({status: ApiStatus.Pending})
      return promise.then(
        newData => {
          setData(newData)
          return data
        },
        (e: string) => {
          setError(e)
          return Promise.reject(error)
        },
      )
    },
    [data, error, safeSetState, setData, setError],
  )

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === ApiStatus.Idle,
    isLoading: status === ApiStatus.Pending,
    isError: status === ApiStatus.Rejected,
    isSuccess: status === ApiStatus.Resolved,

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export function useIsMobile() {
  const currentBreak = useBreakpoint()

  return currentBreak === 'base' || currentBreak === 'sm'
}

export function useFormattedLocationName() {
  const {data: designs} = useDesigns()

  const {pathname} = useRouter()
  if (pathname === '/app') {
    return null
  }
  if (pathname.startsWith('/design')) {
    const designId = pathname.slice(8)
    const design = designs.find(d => d.designId === designId)
    return design?.name
  }
  if (pathname === '/create') {
    return 'Create Design'
  }

  if (pathname === '/settings') {
    return 'Account & Settings'
  }

  if (pathname.startsWith('/vote')) {
    return 'Vote on design'
  }

  if (pathname === '/thank-you') {
    return 'Thank you screen'
  }

  return 'Not Found'
}

export function useCSRFSession() {
  useEffect(() => {
    const getCsrfToken = async () => {
      const {data} = await axios.get('/api/v1/csrf-token')
      axios.defaults.headers['X-CSRF-Token'] = data.csrf
    }
    getCsrfToken()
  }, [])
}

export function useInitialSetup() {
  const clearState = useUser(state => state.clearState)
  const router = useRouter()
  useEffect(() => {
    axios.interceptors.response.use(
      response => {
        // any status code that lie within the range of 2XX cause this function
        // to trigger
        return response
      },
      error => {
        // any status codes that falls outside the range of 2xx cause this function
        // to trigger
        const res = error.response
        if (
          (res.status === 401 || res.status === 403) &&
          res.config &&
          // eslint-disable-next-line no-underscore-dangle
          !res.config.__isRetryRequest
        ) {
          return new Promise((resolve, reject) => {
            axios
              .post('/api/v1/logout')
              .then(async () => {
                clearState()
                await router.push('/login')
              })
              .catch(err => {
                reject(err)
              })
          })
        }
        return Promise.reject(error)
      },
    )
  }, [clearState, router])

  useCSRFSession()
}
