import React from 'react'
import { Container, Flex, Text, VStack, IconButton, Button, Box,Avatar } from "@chakra-ui/react"
import {Link} from "react-router-dom"
import { SquarePlus, Moon, Sun, Dumbbell, LogOut, Menu, House, Folder, History } from 'lucide-react';
import { useColorMode } from "@/components/ui/color-mode"
import { useColorModeValue } from './ui/color-mode';

const Navbar = () => {
    const { colorMode ,toggleColorMode } = useColorMode()

    const bg = useColorModeValue('gray.100', 'gray.900')
    const textColor = useColorModeValue('gray.800', 'whiteAlpha.900')

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
            <Link to="/">
                <Menu size="30"/>
            </Link>
          </Box>

          <Link to="/profile">
            <Avatar.Root>
                <Avatar.Fallback name="Segun Adebayo" />
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
          </Link>

          <Link to="/home">
            <Button variant="ghost" 
            w="full" 
            mt="4" 
            py="10" 
            px="4" 
            fontSize="xs"
            _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}>
              <VStack>
              <House size={16}/>
                    <Text>Home</Text>
              </VStack>
              
            </Button>
          </Link>

          <Link to="/exercises">
            <Button variant="ghost" 
            w="full" 
            py="10" 
            px="2"  
            fontSize="xs"
            _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}>
            <VStack>
              <Dumbbell size={16}/>
                    <Text>Exercises</Text>
              </VStack>
            </Button>
          </Link>

          <Link to="/programs">
            <Button variant="ghost" 
            w="full" 
            py="10" 
            px="2"  
            fontSize="xs"
            _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}>
            <VStack>
              <Folder size={16}/>
                    <Text>Programs</Text>
              </VStack>
            </Button>
          </Link>

          <Link to="/history">
            <Button variant="ghost" 
            w="full" 
            py="10" 
            px="4"  
            fontSize="xs"
            _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}>
            <VStack>
              <History size={16}/>
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
        variant="outline"
        _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
        >
            <LogOut />
        </Button>

        </VStack>
        
      </Flex>
    </Box>
  )
}

export default Navbar;