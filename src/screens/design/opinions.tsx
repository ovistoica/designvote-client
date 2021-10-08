import {ArrowUpIcon} from '@chakra-ui/icons'
import {Grid, Stack, Image, Text, Box, StackDivider} from '@chakra-ui/react'

interface OpinionsSectionProps {
  designUrl: string
}

interface OpinionProps {
  imageUrl: string
  opinion: string
  userId: string
}

function OpinionView({imageUrl, opinion, userId}: OpinionProps) {
  return (
    <Grid gridTemplateColumns="1fr 9fr 1.5fr" alignItems="center" py="4">
      <ArrowUpIcon />
      <Stack px="2">
        <Text fontWeight="600" color="gray.800">
          Andrew Cohen
        </Text>
        <Text color="gray.700">{opinion}</Text>
      </Stack>
      <Image src={imageUrl} rounded="md"></Image>
    </Grid>
  )
}

export function OpinionsSection({designUrl}: OpinionsSectionProps) {
  return (
    <Box
      maxW={{base: 'xl', md: '5xl', lg: '6xl'}}
      mt="12"
      alignSelf="center"
      px={{base: '6', md: '8'}}
      py="8"
      bg="white"
      rounded="md"
      shadow="base"
    >
      <Stack divider={<StackDivider color="gray.200" />}>
        <OpinionView
          opinion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
          userId=""
          imageUrl="https://designvote-storage.fra1.cdn.digitaloceanspaces.com/54afe9d9-18e4-4cfc-89a6-421525186d36-1.jpeg"
        />
        <OpinionView
          opinion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
          userId=""
          imageUrl="https://designvote-storage.fra1.cdn.digitaloceanspaces.com/54afe9d9-18e4-4cfc-89a6-421525186d36-2.jpeg"
        />
        <OpinionView
          opinion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
          userId=""
          imageUrl="https://designvote-storage.fra1.cdn.digitaloceanspaces.com/54afe9d9-18e4-4cfc-89a6-421525186d36-4.jpeg"
        />
      </Stack>
    </Box>
  )
}
