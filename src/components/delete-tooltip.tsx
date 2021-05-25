import {Circle, useColorModeValue as mode} from '@chakra-ui/react'
import {DeleteBin} from 'assets/icons'

interface DeleteTooltipProps {
  onClick: () => void
}

export function DeleteTooltip({onClick}: DeleteTooltipProps) {
  return (
    <Circle
      position="absolute"
      right="-2"
      top="-2"
      bg={mode('gray.50', 'gray.700')}
      size="2em"
      shadow="base"
      opacity={0}
      transition="0.25s all"
      cursor="pointer"
      zIndex="sticky"
      onClick={() => onClick()}
      _groupHover={{
        opacity: 1,
      }}
    >
      <DeleteBin />
    </Circle>
  )
}
