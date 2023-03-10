import { Button, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Index = () => {
  return (
    <Flex
      width="100%"
      align="center"
      justify="center"
      mt="90px"
      direction="column"
    >
      <Text mt={4} fontWeight={800} fontSize="15pt">
        Your Order has been Placed
      </Text>
      <Image src="/assets/tick.png" alt="Success" width="50%" mt={2} />
      <Text align="center" mt={20} fontWeight={400} fontSize="12pt">
        Visit the kiosk to Pay and Confirm the Order
      </Text>

      <Link href="/">
        <Button bg="orange.300" mt={3}>
          Go Back Home
        </Button>
      </Link>
    </Flex>
  );
};

export default Index;
