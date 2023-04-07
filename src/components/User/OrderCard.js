import React from "react";
import { Flex, Text, Button, Icon, useDisclosure } from "@chakra-ui/react";

import { MdCurrencyRupee } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import EditModal from "../EditModal";

const OrderCard = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        width="95%"
        mb={2}
        borderRadius="7pt"
        direction="column"
        align="flex-start"
        bg="orange.200"
        p={2}
      >
        <Flex direction="column" width="100%">
          <Flex width="100%" justify="space-between" align="center">
            <Text fontWeight={600} mr={1} fontSize="10pt">
              Student Name
            </Text>
            <Text fontSize="10pt">{item.studentDetails.name}</Text>
          </Flex>
          <Flex width="100%" justify="space-between" align="center">
            <Text fontWeight={600} mr={1} fontSize="10pt">
              Gender
            </Text>
            <Text fontSize="10pt">{item.studentDetails.gender}</Text>
          </Flex>
          <Flex width="100%" justify="space-between" align="center">
            <Text fontWeight={600} mr={1} fontSize="10pt">
              Going To
            </Text>
            <Text fontSize="10pt">{item.studentDetails.goingToClass}</Text>
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

          {item.cartItems.map((item1, index1) => (
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
            {item.total}
          </Text>
        </Flex>

        <EditModal isOpen={isOpen} onClose={onClose} item={item} />
        <Flex width="100%" align="center" justify="center" mt={1}>
          {/* <Button
            isDisabled="true"
            fontSize="10pt"
            onClick={() => {
              onOpen();
            }}
          >
            Edit Order
            <Icon as={AiOutlineEdit} ml={1} />
          </Button> */}
        </Flex>
      </Flex>
    </>
  );
};

export default OrderCard;
