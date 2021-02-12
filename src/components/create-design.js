import * as React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Text,
  Flex,
  Divider,
  Heading,
} from '@chakra-ui/react'
import {Button} from 'components/lib'
import {EditIcon} from 'assets/icons'
import {useCreateDesign} from 'utils/designs'
import {useNavigate} from 'react-router-dom'

function CreateDesignModal({isOpen, onClose}) {
  const [isFocused, setIsFocused] = React.useState(true)
  const {mutate: createDesign, isLoading} = useCreateDesign()
  const [name, setName] = React.useState('')
  const navigate = useNavigate()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontWeight="400">Create a Design</Heading>
        </ModalHeader>
        <ModalCloseButton color="gray.500" fontSize="xl" fontWeight="800" />
        <ModalBody pb={6}>
          <Text>
            Designs contain multiple versions from which your partners/costumers
            can choose{' '}
          </Text>
          <FormControl id="design-name" label="design-name">
            <Flex align="center">
              <EditIcon />
              <Input
                autoFocus
                value={name}
                placeholder="my-cool-new-design"
                border="none"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                _focus={{border: 'none'}}
                onChange={e => setName(e.target.value)}
              />
            </Flex>
            <Divider borderColor={isFocused ? '#F07320' : 'inherit'} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoading}
            mr={3}
            textTransform="uppercase"
            onClick={() =>
              createDesign(
                {name},
                {
                  onSettled: data =>
                    navigate(`/upload-design/${data['design-id']}`),
                },
              )
            }
            type="submit"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export {CreateDesignModal}
