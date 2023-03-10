import { Button, Flex, Input, Text, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";

const Index = () => {
  const [number, setNumber] = useState("+91");
  const [otp, setOTP] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [err, setErr] = useState("");
  const [conf, setConf] = useState(false);

  const { USER, loginHandler } = useStateContext();

  const OTPHandler = (e) => {
    setOTP(e.target.value);
  };

  const VerifyOTP = () => {
    if (err) setErr("");
    if (otp.length == 6) {
      // verify otp
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;

          setConf(true);
          setTimeout(() => {
            loginHandler((prev) => ({
              ...prev,
              user,
            }));
          }, 1500);

          console.log("USER: ", USER);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          setErr(error.message);
          // ...
        });
    } else {
      console.log("error");
    }
  };

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      },
      auth
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (number.length >= 12) {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, number, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => setErr(error.message));
    }
  };

  return (
    <Flex
      align="center"
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
        <Flex align="center" justify="center" direction="column" mt={5} p={3}>
          <Text>Enter Phone Number</Text>
          <Input
            placeholder="Enter Number"
            mt={2}
            onChange={onChange}
            name="number"
            value={number}
            required
          />
          {expandForm ? (
            <Flex direction="column" align="center" mt={3}>
              <Text>Enter OTP</Text>
              <Input
                placeholder="Enter OTP"
                mt={2}
                name="otp"
                required
                onChange={OTPHandler}
              />
              <Button type="submit" mt={2} bg="orange.300" onClick={VerifyOTP}>
                Verify OTP
              </Button>

              {err && (
                <Text
                  align="center"
                  color="red"
                  fontSize="10pt"
                  fontWeight={800}
                  mt={2}
                >
                  {err}
                </Text>
              )}
              {conf && (
                <>
                  <Text
                    align="center"
                    color="green"
                    fontSize="10pt"
                    fontWeight={800}
                    mt={2}
                  >
                    You have Successfully logged in
                  </Text>
                  <Text
                    align="center"
                    color="green"
                    fontSize="10pt"
                    fontWeight={800}
                    mt={2}
                  >
                    Redirecting
                  </Text>
                </>
              )}
            </Flex>
          ) : (
            <>
              <Button type="submit" mt={2} bg="orange.300" value={otp}>
                Request OTP
              </Button>
            </>
          )}
          <div id="recaptcha-container"></div>
        </Flex>
      </form>
    </Flex>
  );
};

export default Index;
