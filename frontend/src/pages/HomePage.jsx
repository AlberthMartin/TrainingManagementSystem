import { Box, Stack, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthStore } from "@/store/userAuth";
import VolumeCard from "@/components/VolumeCard";
import WeeklySetsCard from "@/components/WeeklySetsCard";
import { SimpleGrid } from "@chakra-ui/react";

export default function HomePage() {
  const { authUser } = useAuthStore();

  return (
    <Box ml="32" mt="10">
      <Stack>
        <Heading>Hi {authUser?.name || "User"}</Heading>
        <SimpleGrid
          columns={{ base: 1, sm: 2 }}
          spacing="4"
          gap="2"
          px="4"
          w="full"
        >
          <VolumeCard />
          <WeeklySetsCard />
        </SimpleGrid>
      </Stack>
    </Box>
  );
}
