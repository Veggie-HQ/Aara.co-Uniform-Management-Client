import InfoModal from "@/components/InfoModal";
import { auth } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";
import { UserStyle, UserWrapper } from "@/styles/UserStyles";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import InfoContainer from "./InfoContainer";
import OrderContainer from "./OrderContainer";

export default function User() {
  const { setShowUser, phoneNumber, PhoneNumberHandler } = useStateContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("successfully signed out");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  PhoneNumberHandler(
    user.email.split("@")[0].substring(0, 3) + user.email.split("@")[0].slice(3)
  );

  return (
    <UserWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowUser(false)}
    >
      <UserStyle
        layout
        initial={{ x: "-50%" }}
        animate={{ x: 0 }}
        exit={{ x: "-50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Flex direction="column" align="center" justify="center" p={2}>
          <Text mb={3} fontWeight={800}>
            User Profile
          </Text>
          <Flex
            width="100%"
            align="center"
            p={2}
            bg="gray.300"
            borderRadius="7pt"
            direction="column"
          >
            <Text fontWeight={700} color="black" fontSize="12pt">
              Registered Email Address
            </Text>

            <Text fontWeight={800} color="orange.500">
              {user.email}
            </Text>

            <Text fontWeight={700} color="black" fontSize="12pt" mt={3}>
              Registered Mobile Number
            </Text>

            <Text fontWeight={800}>{phoneNumber}</Text>

            <hr />
          </Flex>

          <Text fontWeight={800} mt={6}>
            Student Information
          </Text>

          <Flex
            width="100%"
            align="center"
            p={2}
            mt={3}
            bg="gray.300"
            borderRadius="7pt"
            direction="column"
          >
            <InfoContainer />
            <InfoModal isOpen={isOpen} onClose={onClose} />
            <Flex mt={5}>
              <Button
                fontSize="10pt"
                onClick={() => {
                  onOpen();
                }}
              >
                Add Student Info
              </Button>
            </Flex>
          </Flex>

          <Text fontWeight={800} mt={6}>
            Order History
          </Text>

          <Flex
            width="100%"
            align="center"
            p={2}
            mt={3}
            bg="gray.300"
            borderRadius="7pt"
            direction="column"
          >
            <OrderContainer />
            <InfoModal isOpen={isOpen} onClose={onClose} />
          </Flex>
        </Flex>
        <Flex
          mt="50%"
          p={3}
          borderRadius="7pt"
          bg="gray.300"
          align="center"
          justify="center"
        >
          <Button fontSize="12pt" fontWeight={700} onClick={signOutHandler}>
            Log out
          </Button>
        </Flex>
      </UserStyle>
    </UserWrapper>
  );
}
