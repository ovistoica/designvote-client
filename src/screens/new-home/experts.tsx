import {ArrowForwardIcon} from '@chakra-ui/icons'
import {
  Avatar,
  HStack,
  Text,
  Box,
  useColorModeValue as mode,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react'

interface ExpertProps {
  src: string
  name: string
  upvotes: number
}

function Expert({src, name, upvotes}: ExpertProps) {
  return (
    <HStack>
      <Avatar src={src} />
      <Box>
        <Text fontWeight="600" color="gray.700">
          {name}
        </Text>
        <Text color="gray.600">{upvotes} Upvotes</Text>
      </Box>
    </HStack>
  )
}

//TODO: Get this dynamically from server
export function TopExperts() {
  return (
    <Box
      rounded={{lg: 'lg'}}
      bg={mode('white', 'gray.700')}
      maxW="2xl"
      maxH="34rem"
      shadow="base"
      overflow="hidden"
    >
      <Flex align="center" justify="space-between" px="6" py="4">
        <Text as="h3" fontWeight="bold" fontSize="lg">
          Top Experts
        </Text>
      </Flex>
      <Stack spacing="8" py="5" px="8" flex={1}>
        <Expert
          name="Stoica Ovidiu"
          src="https://lh3.googleusercontent.com/a-/AOh14GiU1vxxi1HVgJ_L4oSp3D5EFrUzJjosM1RygTrNAg=s96-c"
          upvotes={21}
        />
        <Expert
          name="Edson Chilundo"
          src="https://lh3.googleusercontent.com/a-/AOh14Gh5Pf-T3Wf6JmSDCGYLkt-oBCqYNKBXBYHpsIdA-YM=s96-c"
          upvotes={15}
        />
        <Expert
          name="Pierre Clerc"
          src="https://lh3.googleusercontent.com/a-/AOh14GiOsau-kyq8vHAzM5XbH7nODl6-y2dknDCbNezqMw=s96-c"
          upvotes={12}
        />
        <Expert
          name="Boldir Victor"
          src="https://lh3.googleusercontent.com/a-/AOh14GiEobO9SkV5wei2QnzkByW_3Zh8BnVm8Mb2je3NYQ=s96-c"
          upvotes={10}
        />
        <Expert
          name="Guillermo Amengual"
          src="https://lh3.googleusercontent.com/a-/AOh14GgfzdPiMsPqaFsil1wetBNu9fi1kVkm7wnFyNYnKw=s96-c"
          upvotes={8}
        />
        <Button
          variant="outline"
          w="full"
          borderColor="orange.400"
          color="orange.400"
          rightIcon={<ArrowForwardIcon />}
          _hover={{bg: 'orange.300', color: 'white'}}
        >
          View All
        </Button>
      </Stack>
    </Box>
  )
}
