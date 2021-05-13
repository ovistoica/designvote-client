import {Image} from '@chakra-ui/image'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/modal'
import {Spinner} from '@chakra-ui/spinner'
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
    <Modal onClose={onClose} size="full" isOpen={isOpen} isCentered>
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
