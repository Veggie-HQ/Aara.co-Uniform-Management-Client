import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
  Image,
  Select,
  Button,
  Input,
  Stack,
} from "@chakra-ui/react";

const goingToClass = [
  "NA",
  "LKG",
  "UKG",
  "1",
  "2",
  "3",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const Index = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="center" justify="center">
              <Text>Enter Student Information</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              align="center"
              justify="center"
              direction="column"
              padding={1}
            >
              <Stack width="100%" spacing={3}>
                <Input placeholder="Enter Name" />
                <Select placeholder="Select Gender">
                  <option value="boy">Boy</option>
                  <option value="girl">Girl</option>
                  <option value="other">Other</option>
                </Select>

                <Select placeholder="Select Going To Class" />
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Index;
