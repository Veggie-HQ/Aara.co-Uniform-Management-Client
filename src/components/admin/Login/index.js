import { Button, Flex, Input, Text, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { auth } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const Index = () => {
  const [signInWithEmailAndPassword, user, loading, userError] =
    useSignInWithEmailAndPassword(auth);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");

  const { ADMIN, adminLoginHandler } = useStateContext();

  const onChange = (e) => {
    setLoginDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(loginDetails.email, loginDetails.password);
      adminLoginHandler(user);
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <Flex
      maxWidth="800px"
      justify="center"
      direction="column"
      mt={5}
      height="400px"
      bg="white"
      width="65%"
      borderRadius="7pt"
      p={3}
    >
      <form onSubmit={onSubmit}>
        <Flex
          bg="rgb(152 151 151 / 25%)"
          borderRadius="7pt"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          backdropFilter="blur(5px)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          maxWidth="400px"
          width="65%"
          margin="0px auto"
          align="center"
          transition={"0.4s"}
          justify="center"
          direction="column"
          _hover={{ transform: "translateY(-5px)" }}
          mt={5}
          p={3}
        >
          <Text
            cursor={"pointer"}
            fontSize="15pt"
            fontWeight={600}
            color="orange.400"
            mb={5}
          >
            Login to Aara Admin
          </Text>
          <Input
            required
            name="email"
            placeholder="Email"
            type="email"
            mb={2}
            onChange={onChange}
            fontSize="10pt"
            _placeholder={{ color: "gray.500" }}
            _hover={{
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            bg="gray.50"
          />
          <Input
            required
            name="password"
            placeholder="Password"
            type="password"
            onChange={onChange}
            fontSize="10pt"
            mb={2}
            _placeholder={{ color: "gray.500" }}
            _hover={{
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            bg="gray.50"
          />

          <Button
            width="100%"
            type="submit"
            height="36px"
            mt={2}
            mb={2}
            isLoading={loading}
            _hover={{ bg: "orange.300", color: "black" }}
          >
            Login
          </Button>
          {(err || userError) && (
            <Text
              color="red.500"
              fontWeight="600"
              fontSize="9pt"
              textAlign="center"
              mb={3}
            >
              {err || FIREBASE_ERRORS[userError.message]}
            </Text>
          )}
        </Flex>
      </form>
    </Flex>
  );
};

export default Index;
