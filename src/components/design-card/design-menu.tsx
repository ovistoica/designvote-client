import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue as mode,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'
import {HiDotsHorizontal} from 'react-icons/hi'
import {DeleteIcon, EditIcon} from '@chakra-ui/icons'
import {FiLink} from 'react-icons/fi'
import {DeleteResourceAlert} from 'components/lib'
import {useDeleteDesign} from 'utils/design-query'

interface DesignMenuProps {
  designId: string
}

export function DesignMenu({designId}: DesignMenuProps) {
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure()
  const {mutate: deleteDesign} = useDeleteDesign()

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          size="sm"
          position="absolute"
          top="0"
          right="0"
          variant="ghost"
          background={mode('white', 'gray.700')}
          onClick={e => e.stopPropagation()}
          _focus={{border: 'none'}}
          _active={{border: 'none'}}
          icon={<HiDotsHorizontal />}
        />

        <MenuList>
          <MenuItem icon={<EditIcon />}>Edit</MenuItem>
          <MenuItem icon={<FiLink />}>Get link</MenuItem>
          <MenuItem
            icon={<DeleteIcon />}
            onClick={e => {
              e.stopPropagation()
              onAlertOpen()
            }}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteResourceAlert
        onClose={onAlertClose}
        isOpen={isAlertOpen}
        onDeletePress={() => {
          deleteDesign(designId)
          onAlertClose()
        }}
        title="Delete design"
        body="Are you sure? This action cannot be undone"
      />
    </>
  )
}
