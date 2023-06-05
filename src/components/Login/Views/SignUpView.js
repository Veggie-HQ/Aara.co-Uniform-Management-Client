import { auth } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";
import {
  Button,
  Input,
  Stack,
  Text,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const SignUpView = () => {
  const { setLoginView } = useStateContext();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [createUserWithEmailAndPassword, user, userLoading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (error) setError("");
    setLoading(true);
    try {
      if (details.password !== details.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        setDetails({ confirmPassword: "", password: "" });
        return;
      }
      createUserWithEmailAndPassword(
        `+91${details.email}@aara.com`,
        details.password
      );
    } catch (error) {
      setError(error.message);
      console.log("Sign Up Error", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Text fontWeight={700}>Sign Up to Aara</Text>

      <form onSubmit={onSubmit}>
        <Stack mt={2}>
          <InputGroup mt={2}>
            <InputLeftAddon>+91</InputLeftAddon>
            <Input
              onChange={onChange}
              type="text"
              placeholder="Enter Mobile Number"
              name="email"
              value={details.email}
              required
            />
          </InputGroup>

          <Input
            onChange={onChange}
            type="password"
            placeholder="Enter Password"
            mt={2}
            name="password"
            required
            value={details.password}
          />
          <Input
            onChange={onChange}
            type="password"
            placeholder="Confirm Password"
            mt={2}
            name="confirmPassword"
            required
            value={details.confirmPassword}
          />
          {/* <Input
            placeholder="Enter Number"
            onChange={onChange}
            name="mobileNumber"
            value={details.mobileNumber}
            required
          /> */}
          {error && (
            <Text
              fontWeight={600}
              fontSize="12pt"
              color="red"
              mt={2}
              align="center"
            >
              {error}
            </Text>
          )}

          <Button isLoading={loading} bg="orange.200" type="submit">
            Sign Up
          </Button>
        </Stack>
        <Text
          _active={{ textDecoration: "underline" }}
          _hover={{ textDecoration: "underline", cursor: "pointer" }}
          mt={5}
          align="center"
          fontSize="10pt"
          onClick={() => setLoginView("login")}
        >
          Already have an account? Log in here!
        </Text>
      </form>
    </>
  );
};

export default SignUpView;
