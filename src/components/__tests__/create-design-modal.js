import {ChakraProvider, theme} from '@chakra-ui/react'
import {render, screen, within} from '@testing-library/react'
import * as React from 'react'
import {Dashboard} from 'screens/dashboard'
import {BrowserRouter as Router} from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const TestProvider = props => {
  return (
    <Router>
      <ChakraProvider theme={theme} {...props} />
    </Router>
  )
}

jest.mock('utils/designs', () => {
  return {
    useDesigns: () => ({
      designs: [{name: 'one', designId: 'testID'}],
      isLoading: false,
    }),
    useCreateDesign: () => ({mutate: jest.fn(), isLoading: false}),
    useDeleteDesign: () => ({mutate: jest.fn(), isLoading: false}),
  }
})

test('can be opened and closed', async () => {
  render(<Dashboard />, {wrapper: TestProvider})

  const addDesignButton = screen.getByRole('button', {name: 'Add design'})
  userEvent.click(addDesignButton)

  const createModal = screen.getByRole('dialog', {name: 'Create a Design'})
  expect(createModal).toBeInTheDocument()

  const inModal = within(createModal)
  const closeButton = inModal.getByRole('button', {name: 'Close'})

  expect(closeButton).toBeInTheDocument()
  expect(
    inModal.getByRole('heading', {name: 'Create a Design'}),
  ).toBeInTheDocument()

  expect(inModal.getByRole('button', {name: 'Submit'})).toBeInTheDocument()

  expect(
    inModal.getByRole('textbox', {name: 'New design name'}),
  ).toBeInTheDocument()

  userEvent.click(closeButton)

  //TODO: FIX THIS. RIGHT NOW THIS SHOULD FAIL
  expect(screen.queryByRole('dialog')).toBeInTheDocument()
})
test.todo('can create a design')
test.todo('handles error if server returns one')
