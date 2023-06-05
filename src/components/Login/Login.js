import { useStateContext } from "@/lib/context";
import { Flex } from "@chakra-ui/react";
import LoginView from "./Views/LoginView";
import SignUpView from "./Views/SignUpView";

const UserLogin = () => {
  const { loginView } = useStateContext();
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
      {loginView === "login" ? <LoginView /> : <SignUpView />}
    </Flex>
  );
};

export default UserLogin;
