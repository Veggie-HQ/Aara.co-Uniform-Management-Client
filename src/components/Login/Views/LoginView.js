import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { useStateContext } from "@/lib/context";
import {
  Button,
  Input,
  Stack,
  Text,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const LoginView = () => {
  const { setLoginView } = useStateContext();
  const [details, setDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [signInWithEmailAndPassword, user, userloading, usererror] =
    useSignInWithEmailAndPassword(auth);

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
      signInWithEmailAndPassword(
        `+91${details.email}@aara.com`,
        details.password
      );
    } catch (error) {
      setError(error.message);
      console.log("Login Up Error", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Text fontWeight={700}>Login to Aara</Text>

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
            value={details.password}
            type="password"
            placeholder="Enter Password"
            mt={2}
            name="password"
            required
          />
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
          {usererror && (
            <Text
              fontWeight={600}
              fontSize="12pt"
              color="red"
              mt={2}
              align="center"
            >
              {FIREBASE_ERRORS[usererror.message]}
            </Text>
          )}
          <Button isLoading={loading} type="submit" bg="orange.200">
            Login
          </Button>
        </Stack>

        <Text
          _active={{ textDecoration: "underline" }}
          _hover={{ textDecoration: "underline", cursor: "pointer" }}
          mt={5}
          align="center"
          fontSize="10pt"
          onClick={() => setLoginView("signup")}
        >
          Don&apos;t have an account? create one here!
        </Text>
      </form>
    </>
  );
};

export default LoginView;
