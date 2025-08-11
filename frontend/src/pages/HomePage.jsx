import { Box, Stack, Heading, Text } from "@chakra-ui/react"
import React from 'react'
import { useAuthStore } from "@/store/userAuth"
import VolumeCard from "@/components/VolumeCard";
import WeeklySetsCard from "@/components/WeeklySetsCard";

export default function HomePage() {

  const { authUser } = useAuthStore();
  
  return (
    <Box ml="32" mt="10"  >
      <Stack>
        <Heading>
            Hi {authUser?.name || "User"}
        </Heading>
        <VolumeCard/>
        <WeeklySetsCard/>
      </Stack>
    </Box>
  )
}
