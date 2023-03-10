import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
// import { LKGUKGData } from "@/data/LKGUKG";
// import { S1To4Data } from "@/data/S1To4";
// import { S5, S6To12Data } from "@/data/S5To12";
import { useState } from "react";

const Index = ({ isOpen, onClose, data }) => {
  console.log(data);
  const [DATA, setDATA] = useState([]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex align="center" justify="center">
            <Text>Edit Order</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex width="100%" p={2} direction="column">
            <Text fontSize="10pt">Order ID: {data.id}</Text>
            <Text fontSize="10pt">Parent Mobile Number: {data.parentInfo}</Text>
            <Flex>
              <Text fontSize="10pt">Student Name:</Text>
              <Text fontSize="10pt" ml={1} fontWeight={600}>
                {data.studentDetails.name}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="10pt">Student Gender:</Text>
              <Text fontSize="10pt" ml={1} fontWeight={600}>
                {data.studentDetails.gender}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="10pt">Going to Class:</Text>
              <Text fontSize="10pt" ml={1} fontWeight={600}>
                {Number(data.studentDetails.goingToClass)}
              </Text>
            </Flex>

            <Box mt={5}>
              {data.cartItems.map((item, index) => (
                <Flex key={index} direction="column">
                  <Flex width="100%" align="center" justify="space-evenly">
                    <Text width="30%">{item.title}</Text>
                    <Input
                      width="30%"
                      placeholder="Change Size"
                      _placeholder={{ fontSize: "8pt" }}
                    />
                    <Input
                      width="30%"
                      placeholder="Change Qty"
                      _placeholder={{ fontSize: "8pt" }}
                    />
                  </Flex>
                </Flex>
              ))}
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Index;
