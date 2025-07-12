import React from "react";
import { useWorkoutStore } from "@/store/workout";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { TimerReset } from "lucide-react"; 
import { useColorModeValue } from "./ui/color-mode";

export default function ActiveWorkoutBottomBar() {
  const activeWorkout = useWorkoutStore((state) => state.activeWorkout);
  
  if (!activeWorkout?._id) return null;

  const bg = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Link to="/activeWorkout">
      <Box shadow="md"
        borderTop="1px solid"
        borderColor={borderColor}
        position="fixed"
        bottom="0"
        left="20" 
        right="0"
        h="12"
        bg={bg}
        zIndex="999"
        px={4}
        _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
        transition="background-color 0.2s ease"
        cursor="pointer"
        align="center">
        
        <Flex justify="center" align="center" h="full" w="full" gap={4}>
          <Text fontWeight="medium">
            {activeWorkout.name}
          </Text>
          <Flex align="center" gap={2}>
            <Icon as={TimerReset} boxSize={4} />
            <Text fontSize="sm" color="gray.500">
              00:00
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
}
