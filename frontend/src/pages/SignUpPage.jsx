import {
  Flex,
  Box,
  Input,
  Heading,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import React from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/userAuth";
import { useNavigate, Link } from "react-router-dom";

// Could immplement the password strength indicator from chakraUI

export default function SignUpPage() {
  const inputFieldColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("black", "white");

  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  //Password
  const [visible, setVisible] = useState(false);

  const validateForm = async () => {
    if (!newUser.name.trim()) {
      toaster.create({
        title: "Invalid input",
        description: "Full name is required",
        status: "error",
        type: "error",
        duration: 3000,
        isClosable: "true",
      });
      return false;
    }
    if (!newUser.email.trim()) {
      toaster.create({
        title: "Invalid input",
        description: "Email is required",
        status: "error",
        type: "error",
        duration: 3000,
        isClosable: "true",
      });
      return false;
    }
    if (!newUser.password) {
      toaster.create({
        title: "Invalid input",
        description: "Password is required",
        status: "error",
        type: "error",
        duration: 3000,
        isClosable: "true",
      });
      return false;
    }
    if (newUser.password.length < 6) {
      toaster.create({
        title: "Invalid input",
        description: "Password must be at least 6 characters",
        status: "error",
        type: "error",
        duration: 3000, //Default 5 s now 3 s
        isClosable: "true",
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      toaster.create({
        title: "Invalid input",
        description: "Password must be at least 6 characters",
        status: "error",
        type: "error",
        duration: 3000,
        isClosable: "true",
      });
      return false;
    }

    return true;
  };

  const handleCreateUser = async () => {
    //Validate the input
    const success = await validateForm();

    //If the data is correct, signup the new user
    if (success === true) {
      signup(newUser);
    }

    if (!success) {
      toaster.create({
        title: "Error",
        description: "Something went wrong when signing up user",
        status: "error",
        type: "error",
        duration: 3000, //Default 5 s now 3 s
        isClosable: "true",
      });
    } else {
      toaster.create({
        title: "Success",
        description: "New user created",
        status: "success",
        type: "success",
        duration: 1000, //Default 5 s now 3 s
        isClosable: "true",
      });
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Stack w="400px">
        <Heading>Create new user</Heading>

        <Box>
          <Stack>
            <Input
              placeholder="Your name"
              name="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              bg={inputFieldColor}
              color={textColor}
            />
            <Input
              placeholder="Email"
              name="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              bg={inputFieldColor}
              color={textColor}
            />

            <PasswordInput
              placeholder="password"
              name="password"
              visible={visible}
              onVisibleChange={setVisible}
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              bg={inputFieldColor}
              color={textColor}
            />

            <Button onClick={handleCreateUser} disabled={isSigningUp}>
              Create User
            </Button>

            <Text mt="2">You already have an account? </Text>
            <Link to="/login">
              <Text
                as="span"
                textDecoration="underline"
                cursor="pointer"
                hover={{ color: "gray.500", textDecoration: "underline" }}
              >
                {" "}
                Click here
              </Text>
            </Link>

            <Toaster />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
