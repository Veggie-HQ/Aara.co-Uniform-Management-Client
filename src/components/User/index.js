import { UserStyle, UserWrapper } from "@/styles/UserStyles";
import { auth } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";
import { Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import InfoContainer from "./InfoContainer";
import OrderContainer from "./OrderContainer";
import InfoModal from "@/components/InfoModal";

import { signOut } from "firebase/auth";

export default function User() {
  const { setShowUser, USER } = useStateContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Text>Parent Mobile Number</Text>
            <Text fontWeight={800}>{USER.user.phoneNumber}</Text>
            <hr />
            <Text
              fontStyle="italic"
              fontSize="10pt"
              mt={3}
              color="orange.500"
              onClick={signOutHandler}
              cursor="pointer"
            >
              Change Number
            </Text>
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
      </UserStyle>
    </UserWrapper>
  );
}
