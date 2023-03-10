import { UserStyle, UserWrapper } from "@/styles/UserStyles";

import { useStateContext } from "@/lib/context";
import { Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import InfoContainer from "./InfoContainer";
import InfoModal from "@/components/InfoModal";

export default function User() {
  const { setShowUser, cartItems } = useStateContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Payment
  // const handleCheckout = async () => {
  //   const stripePromise = await getStripe();
  //   const response = await fetch("/api/stripe", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(cartItems),
  //   });
  //   const data = await response.json();
  //   await stripePromise.redirectToCheckout({ sessionId: data.id });
  // };

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
        exit={{ x: "0%" }}
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
            <Text fontWeight={800}>+91 8861302233</Text>

            <Text
              fontStyle="italic"
              fontSize="10pt"
              mt={3}
              color="orange.500"
              onClick={() => {}}
              cursor="pointer"
            >
              Change Number
            </Text>
          </Flex>

          <Flex
            width="100%"
            align="center"
            p={2}
            mt={6}
            bg="gray.300"
            borderRadius="7pt"
            direction="column"
          >
            <Text mb={2}>Student Information</Text>
            <InfoContainer />
            <InfoModal isOpen={isOpen} onClose={onClose} />
            <Flex mt={5}>
              <Button
                fontSize="10pt"
                onClick={() => {
                  onOpen();
                }}
              >
                Add Another Student&apos;s Info
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </UserStyle>
    </UserWrapper>
  );
}
