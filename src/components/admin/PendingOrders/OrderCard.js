import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MdCurrencyRupee } from "react-icons/md";

const OrderCard = ({ order }) => {
  //   console.log(order);
  return (
    <Flex
      width="95%"
      mb={2}
      borderRadius="7pt"
      direction="column"
      align="flex-start"
      bg="orange.200"
      p={2}
      //   onClick={() => console.log("ORDER CLICKED:", order)}
    >
      <Flex direction="column" width="100%">
        <Flex width="100%" justify="space-between" align="center">
          <Text fontWeight={600} mr={1} fontSize="10pt">
            Student Name
          </Text>
          <Text fontSize="10pt">{order.studentDetails.name}</Text>
        </Flex>
        <Flex width="100%" justify="space-between" align="center">
          <Text fontWeight={600} mr={1} fontSize="10pt">
            Gender
          </Text>
          <Text fontSize="10pt">{order.studentDetails.gender}</Text>
        </Flex>
        <Flex width="100%" justify="space-between" align="center">
          <Text fontWeight={600} mr={1} fontSize="10pt">
            Going To
          </Text>
          <Text fontSize="10pt">{order.studentDetails.goingToClass}</Text>
        </Flex>
      </Flex>

      <Flex width="100%" direction="column">
        <Flex
          direction="row"
          justify="space-between"
          borderTop="1px solid black"
          borderBottom="1px solid black"
          mb={1}
          mt={1}
        >
          <Text fontWeight={600} mr={1}>
            Items:
          </Text>
          <Text fontWeight={600}>Quantity:</Text>
        </Flex>

        {order.cartItems.map((item1, index1) => (
          <Flex
            key={index1}
            width="100%"
            direction="row"
            justify="space-between"
          >
            <Text>
              {item1.title} (Size: {item1.size})
            </Text>
            <Text>{item1.quantity}</Text>
          </Flex>
        ))}
      </Flex>

      <Flex mt={5} align="center">
        <Text fontWeight={600} mr={1}>
          Total:
        </Text>
        <MdCurrencyRupee />
        <Text fontWeight={600} mr={1}>
          {order.total}
        </Text>
      </Flex>
      <Button bg="white" variant="sm">
        Select Order
      </Button>
    </Flex>
  );
};

export default OrderCard;
