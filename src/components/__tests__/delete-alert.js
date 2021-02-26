import {ChakraProvider, theme, useDisclosure} from '@chakra-ui/react'
import {render, screen} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import {DeleteResourceAlert} from '../lib'
const TestProvider = props => {
  return <ChakraProvider theme={theme} {...props} />
}

test('renders correctly', async () => {
  const {result} = renderHook(() => useDisclosure({isOpen: true}))
  const {isOpen, onClose} = result.current
  const defaultTitle = /delete resource/i
  const defaultModalBody =
    "Are you sure? You can't undo this action afterwards."
  const onDeletePress = jest.fn()

  render(
    <DeleteResourceAlert
      isOpen={isOpen}
      onClose={onClose}
      onDeletePress={onDeletePress}
    />,
    {
      wrapper: TestProvider,
    },
  )

  expect(
    screen.getByRole('alertdialog', {name: defaultTitle}),
  ).toBeInTheDocument()

  expect(screen.getByRole('button', {name: /delete/i})).toBeInTheDocument()

  expect(screen.getByRole('button', {name: /cancel/i})).toBeInTheDocument()
  expect(screen.getByRole('banner', {name: defaultTitle})).toBeInTheDocument()
  expect(screen.getByText(defaultModalBody)).toBeInTheDocument()
})

test('shows custom title and body', async () => {
  const {result} = renderHook(() => useDisclosure({isOpen: true}))
  const {isOpen, onClose} = result.current
  const customTitle = 'This is a test title'
  const customBody = 'This is a test body'

  const onDeletePress = jest.fn()

  render(
    <DeleteResourceAlert
      isOpen={isOpen}
      onClose={onClose}
      onDeletePress={onDeletePress}
      title={customTitle}
      body={customBody}
    />,
    {
      wrapper: TestProvider,
    },
  )

  expect(
    screen.getByRole('alertdialog', {name: customTitle}),
  ).toBeInTheDocument()

  expect(screen.getByRole('button', {name: /delete/i})).toBeInTheDocument()

  expect(screen.getByRole('button', {name: /cancel/i})).toBeInTheDocument()
  expect(screen.getByRole('banner', {name: customTitle})).toBeInTheDocument()
  expect(screen.getByText(customBody)).toBeInTheDocument()
})
