import { Box, Stack, Heading, Text } from "@chakra-ui/react"
import React from 'react'

export default function HomePage() {
  return (
    <Box ml="32" mt="10"  >
      <Stack>
        <Heading>
            Hi User ... !
        </Heading>
        <Text>
            Dashboard...
        </Text>
        <Text>
            Challanges
        </Text>
        <Text>
            PR progression
        </Text>
      </Stack>
    </Box>
  )
}
