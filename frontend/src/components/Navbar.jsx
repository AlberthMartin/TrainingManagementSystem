import React, { useEffect, useState } from "react";
import {
  Container,
  Flex,
  Text,
  VStack,
  IconButton,
  Button,
  Box,
  Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  SquarePlus,
  Moon,
  Sun,
  Dumbbell,
  LogOut,
  Menu,
  House,
  Folder,
  History,
} from "lucide-react";
import { HomeIcon as HomeOutlineIcon } from "@heroicons/react/24/outline"
import { HomeIcon as HomeSolidIcon } from "@heroicons/react/24/solid";
import { ClockIcon as ClockSolidIcon } from "@heroicons/react/24/solid";
import { ClockIcon as ClockOutlineIcon } from "@heroicons/react/24/outline";


import { useColorMode } from "@/components/ui/color-mode";
import { useColorModeValue } from "./ui/color-mode";
import { useAuthStore } from "@/store/userAuth";


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

  const [selectedPage, setSelectedPage] = useState(() => {
    return localStorage.getItem("selectedPage") || "home";
  });

  useEffect(() => {
    localStorage.setItem("selectedPage", selectedPage);
  }, [selectedPage]);

  const { logout, authUser } = useAuthStore();

  const handleLogOut = async () => {
    logout();
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      h="100vh"
      w="20"
      bg={bg}
      shadow="md"
      zIndex="1000"
    >
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        h="full"
        py={6}
      >
        {/* Top Section of Navbar*/}
        <VStack spacing={12} gap="2">
          <Box mb="8">
            {/** TODO: Menu comes out from left with detailed navbar, component is called DRAWER */}
            <Menu size="30" />
          </Box>

          <Link to="/profile">
            <Avatar.Root>
              <Avatar.Fallback name={authUser?.name || "User"} />
              <Avatar.Image src={authUser?.profilePicture || ""} />
            </Avatar.Root>
          </Link>

          <Link to="/home">
            <Button
              variant="ghost"
              w="full"
              mt="4"
              py="10"
              px="4"
              
              fontSize="xs"
              _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              onClick={() =>setSelectedPage("home")}
            >
              <VStack>
                {selectedPage === "home" ? 
                <HomeSolidIcon size={16}/> : 
                <HomeOutlineIcon size={16} />
                }
                <Text>Home</Text>
              </VStack>
            </Button>
          </Link>

          <Link to="/exercises">
            <Button
              variant="ghost"
              w="full"
              py="10"
              px="2"
              fontSize="xs"
              _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              onClick={() =>setSelectedPage("exercises")}
            >
              <VStack>
                {selectedPage === "exercises" ? 
                <Dumbbell size={16} style={{ fill: "currentColor" }}/> : 
                <Dumbbell size={16} />
                }
                <Text>Exercises</Text>
              </VStack>
            </Button>
          </Link>

          <Link to="/workouts">
            <Button
              variant="ghost"
              w="full"
              py="10"
              px="2"
              fontSize="xs"
              _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              onClick={() =>setSelectedPage("workouts")}
            >
              <VStack>
                {selectedPage === "workouts" ? 
                <Folder size={16} style={{ fill: "currentColor" }}/> : 
                <Folder size={16} />
                }
                <Text>Workouts</Text>
              </VStack>
            </Button>
          </Link>

          <Link to="/history">
            <Button
              variant="ghost"
              w="full"
              py="10"
              px="4"
              fontSize="xs"
              _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              onClick={() =>setSelectedPage("history")}
            >
              <VStack>
                {selectedPage === "history" ? 
                <ClockSolidIcon size={16} style={{ fill: "currentColor" }}/> : 
                <ClockOutlineIcon size={16} />
                }

                <Text>History</Text>
              </VStack>
            </Button>
          </Link>
        </VStack>

        {/* Bottom of the navbar */}
        <VStack>
          <Button
            onClick={toggleColorMode}
            variant="outline"
            _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
          >
            {colorMode === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          <Button
            onClick={handleLogOut}
            variant="outline"
            _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
          >
            <LogOut />
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
