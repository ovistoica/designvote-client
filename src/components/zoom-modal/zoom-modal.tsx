import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/modal'
import {useZoomModalState} from './current-zoomed-state'
import {ImageCarousel} from './image-carousel'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export function ZoomModal({isOpen, onClose}: Props) {
  const {images, startSlide} = useZoomModalState(state => ({
    images: state.images,
    startSlide: state.startIndex,
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
      <ModalOverlay onClick={onClose} />
      <ModalContent bg="transparent" onClick={onClose}>
        <ModalCloseButton
          variant="solid"
          bg="white"
          size="lg"
          rounded="full"
          color="black"
        />
        <ModalBody
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="transparent"
        >
          <ImageCarousel images={images ?? []} startSlide={startSlide} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
