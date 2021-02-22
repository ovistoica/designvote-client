// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import crypto from '@trust/webcrypto'
import {server} from 'test/server'

// necessary in jsdom env for auth0
window.crypto = crypto

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => {
  jest.mock('@auth0/auth0-react', () => ({
    useAuth0: jest.fn(() => ({
      isLoading: false,
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn(() => Promise.resolve('access-token')),
    })),
    withAuthenticationRequired: jest.fn(),
  }))

  server.listen()
})
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
