import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  Image,
  Input,
  Select,
  Box,
} from "@chakra-ui/react";
import EditRow from "./EditRow";

const EditModal = ({ isOpen, onClose, item }) => {
  console.log("IN EDITMODAL", item);

  const onUpdate = async (e) => {
    e.preventDefault();
    console.log("ORDER UPDATED");
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="center" justify="center">
              <Text>Edit Order for {item.studentDetails.name}</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onUpdate}>
            <ModalBody>
              <Flex p={1} direction="column" width="100%" align="center">
                <Flex width="100%" align="center" justify="space-evenly">
                  <Text align="center" fontSize="10pt" width="32%">
                    Item Name
                  </Text>
                  <Text align="center" fontSize="10pt" width="32%">
                    Quantity
                  </Text>
                  <Text align="center" fontSize="10pt" width="32%">
                    Size
                  </Text>
                </Flex>
                <Flex
                  width="100%"
                  border="1px solid blue"
                  align="center"
                  justify="space-evenly"
                  direction="column"
                >
                  {item.cartItems.map((cartItem, index) => (
                    <EditRow item={cartItem} key={index} />
                  ))}
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue" onClick={onClose}>
                Update and Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
