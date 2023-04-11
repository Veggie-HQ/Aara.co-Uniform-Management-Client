import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [currVeiw, setCurrView] = useState("Login");
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      mt={5}
      height="400px"
      bg="white"
      width="80%"
      borderRadius="7pt"
      p={3}
    >
      {currVeiw === "Login" ? (
        <>
          <Text fontWeight={700}>Login to Aara</Text>
          <form>
            <Stack mt={2}>
              <Input
                type="email"
                placeholder="Enter Email"
                mt={2}
                name="email"
                required
              />
              <Input
                type="password"
                placeholder="Enter Password"
                mt={2}
                name="email"
                required
              />
              <Button bg="orange.200">Login</Button>
            </Stack>
            <Text
              _hover={{ textDecoration: "underline", cursor: "pointer" }}
              mt={5}
              align="center"
              fontSize="10pt"
              onClick={() => setCurrView("SignUp")}
            >
              Don&apos;t have an Account? create one now!
            </Text>
          </form>
        </>
      ) : (
        <>
          <Text fontWeight={700}>Sign Up to Aara</Text>
          <form>
            <Stack mt={2}>
              <Input
                type="email"
                placeholder="Enter Email"
                mt={2}
                name="email"
                required
              />
              <Input
                type="password"
                placeholder="Enter Password"
                mt={2}
                name="email"
                required
              />
              <Input
                placeholder="Enter Number"
                //   onChange={onChange}
                name="number"
                //   value={number}
                required
              />
              <Button bg="orange.200">Sign Up</Button>
            </Stack>
            <Text
              _hover={{ textDecoration: "underline", cursor: "pointer" }}
              mt={5}
              align="center"
              fontSize="10pt"
              onClick={() => setCurrView("Login")}
            >
              Already have an Account? Log in here!
            </Text>
          </form>
        </>
      )}
    </Flex>
  );
};

export default Login;
