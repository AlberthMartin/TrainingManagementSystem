import { Box, Stack, Heading, Text } from "@chakra-ui/react"
import React from 'react'
import { useAuthStore } from "@/store/userAuth"

export default function HomePage() {

  const { authUser } = useAuthStore();
  
  return (
    <Box ml="32" mt="10"  >
      <Stack>
        <Heading>
            Hi {authUser?.name || "User"}
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
