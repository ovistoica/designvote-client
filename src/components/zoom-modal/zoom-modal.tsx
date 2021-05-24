import {
  Modal,
  ModalBody,
  ModalCloseButton,
  Image,
  Spinner,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'

import {useZoomModalState} from './current-zoomed-state'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export function ZoomModal({isOpen, onClose}: Props) {
  const {imageUrl} = useZoomModalState(state => ({
    imageUrl: state.imageUrl,
    title: state.title,
  }))
  return (
    <Modal
      onClose={onClose}
      size="full"
      isOpen={isOpen}
      isCentered
      closeOnOverlayClick
      closeOnEsc
    >
      <ModalOverlay />
      <ModalContent bg="transparent" shadow="none">
        <ModalCloseButton color="white" />
        <ModalBody
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="transparent"
        >
          {imageUrl ? <Image src={imageUrl} /> : <Spinner />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
