import { VStack, Container, Box, Input, Heading, Button, Stack, Text, Spinner} from '@chakra-ui/react'
import { PasswordInput } from "@/components/ui/password-input"
import React from 'react'
import { useColorModeValue } from '../components/ui/color-mode'
import { useState } from 'react'
import { Toaster, toaster } from "@/components/ui/toaster"
import { useAuthStore } from '@/store/userAuth'
import { useNavigate } from "react-router-dom";
import {LoaderCircle} from "lucide-react"
import { Link } from 'react-router-dom'


// Could immplement the password strength indicator from chakraUI

export default function SignUpPage() {
    const inputFieldColor = useColorModeValue("white", "gray.700")
    const textColor = useColorModeValue("black", "white")

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { login, isLoggingIn } = useAuthStore();
    //Password
    const [visible, setVisible] = useState(false)

    const handleLogin = async() => {
        login(formData)

        setTimeout(() => {
            navigate("/home")
        }, 1000)
    }

  return (
    <Container maxW="md" px="4" py="4" ml="24" mt="6">
      <Stack>
        <Heading fontSize="2xl">
            Welcome Back!
        </Heading>
        <Text fontSize="sm">Sign in to your account</Text>

        <Box>
            <Stack gap="2">
                <Input
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                bg={inputFieldColor}
                color={textColor}
                />
                       
                <PasswordInput
                placeholder="password"
                name="password"
                visible={visible}
                onVisibleChange={setVisible}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                bg={inputFieldColor}
                color={textColor}
                />
                    
                <Button onClick={handleLogin} disabled={isLoggingIn} mt="2">
                    {isLoggingIn ? (
                        <>
                        <Spinner/>
                        </>
                    ) : (
                        <Text>Sign In</Text>
                    )}
                    
                </Button>
                    <Text mt="2">You do not have an account? </Text>
                    <Link to="/signup">
                        <Text as="span" textDecoration="underline"
                        cursor="pointer"
                        hover={{ color: "gray.500", textDecoration: "underline" }}
                        > Click here</Text>
                    </Link>
                <Toaster/>
            </Stack>
        </Box>
      </Stack>
    </Container>
  )
}
