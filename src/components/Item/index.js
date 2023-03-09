import { Flex, Image, Text, Box } from "@chakra-ui/react";
import React from "react";
import { MdCurrencyRupee } from "react-icons/md";

const Index = ({ item }) => {
  const { title, price, imageURL } = item;
  return (
    <Flex
      width="90%"
      margin="0px auto"
      padding="10pt"
      height="100px"
      bg="rgba(255,255,255,0.5)"
      mb={2}
      borderRadius="7pt"
      align="center"
      justify="space-between"
    >
      <Flex align="center" justify="center" width="30%">
        <Image src={imageURL} alt={title} width="50px" />
      </Flex>
      <Flex direction="column" left="0" width="70%">
        <Text fontWeight={600}>{title}</Text>
        <Flex align="center">
          <Text fontWeight={800} mr={1}>
            Price:
          </Text>
          <MdCurrencyRupee />
          <Text fontWeight={800} ml={1}>
            {price}
          </Text>
        </Flex>
        <Text mt={2} align="center" fontSize="9pt" fontStyle="italic">
          Tap to Add to Cart
        </Text>
      </Flex>
    </Flex>
  );
};

export default Index;
