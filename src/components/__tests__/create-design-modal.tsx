import {render, screen, within} from 'test/test-utils'
import {Dashboard} from 'screens/dashboard'
import userEvent from '@testing-library/user-event'

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

jest.mock('utils/design-query', () => {
  return {
    useDesigns: () => ({
      data: [{name: 'one', designId: 'testID'}],
      isLoading: false,
    }),
  }
})

test('can be opened and closed', async () => {
  render(<Dashboard />)

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

  userEvent.click(closeButton)

  expect(
    inModal.getByRole('textbox', {name: /design name/i}),
  ).toBeInTheDocument()
  expect(
    inModal.getByRole('textbox', {name: /targeted question/i}),
  ).toBeInTheDocument()
  expect(
    inModal.getByRole('textbox', {name: /design description/i}),
  ).toBeInTheDocument()

  //TODO: FIX THIS. RIGHT NOW THIS SHOULD FAIL
  expect(screen.queryByRole('dialog')).toBeInTheDocument()
})
test.todo('can create a design')
test.todo('handles error if server returns one')
