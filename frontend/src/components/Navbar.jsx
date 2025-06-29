import React from 'react'
import { Container, Flex, Text, HStack, IconButton, Button, Box } from "@chakra-ui/react"
import {Link} from "react-router-dom"
import { SquarePlus, Moon, Sun, Dumbbell } from 'lucide-react';
import { useColorMode } from "@/components/ui/color-mode"
import { useColorModeValue } from './ui/color-mode';

const Navbar = () => {
    const { colorMode ,toggleColorMode } = useColorMode()

    const bg = useColorModeValue('gray.100', 'gray.900')
    const textColor = useColorModeValue('gray.800', 'whiteAlpha.900')

  return (
    <Box bg={bg} shadow="sm">
    <Container maxW ={"container.xl"} py={4}>
        <Flex
        align={"center"}
        justify={"space-between"}
        wrap="wrap"
        gap={4}
        px={4}
        flexDir={{
            base: "column",
            sm:"row"
        }}
        >
        <Text
        fontSize="xl"
        fontWeight="bold"
        color={textColor}
        textAlign={{ base: 'center', sm: 'left' }}
        >
            <Link to={"/"} ><Dumbbell size="28"/></Link>
    
        </Text>

        <HStack spacing={2}> 
            <Link to={"/create"}>
            <Button variant="outline" _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}>
                <SquarePlus w={18} h={18}/>
            </Button>
            </Link>
            <Button onClick={toggleColorMode} variant="outline" _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}>
                {colorMode === "light" ? <Moon size={18}/> : <Sun size={18} />}
            </Button>

        </HStack>
        

        </Flex>

    </Container>
    </Box>
  )
}

export default Navbar;