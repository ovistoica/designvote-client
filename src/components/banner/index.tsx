import {Box, HStack, Stack, Text} from '@chakra-ui/react'

export const Banner = () => (
  <Box as="section" pt="4.5rem">
    <Box
      bgGradient="linear(to-r, blue.500, purple.500)"
      color="white"
      py="3"
      px={{base: '3', md: '6', lg: '8'}}
    >
      <HStack spacing="3">
        <Stack
          direction={{base: 'column', sm: 'row'}}
          justifyContent="center"
          alignItems="center"
          spacing={{base: '3', md: '6'}}
          width="full"
        >
          <Text textAlign="center">
            <b> We launched on Product Hunt 🚀 </b>
            If you love Designvote show your support
          </Text>
          <a
            href="https://www.producthunt.com/posts/designvote?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-designvote"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=296176&theme=dark"
              alt="Designvote - Get feedback on designs FAST! | Product Hunt"
              style={{width: '250px', height: '54px'}}
              width="250"
              height="54"
            />
          </a>
        </Stack>
      </HStack>
    </Box>
  </Box>
)
