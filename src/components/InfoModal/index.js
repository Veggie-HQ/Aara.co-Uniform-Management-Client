import { useState } from "react";
import { useStateContext } from "@/lib/context";

import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
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
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    gender: "",
    goingToClass: "",
  });

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setStudentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { onAddStudent } = useStateContext();

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
                <Input
                  placeholder="Enter Name"
                  name="name"
                  onChange={onChange}
                />
                <Select
                  placeholder="Select Gender"
                  name="gender"
                  onChange={onChange}
                >
                  <option value="boy">Boy</option>
                  <option value="girl">Girl</option>
                  <option value="other">Other</option>
                </Select>

                <Select
                  placeholder="Select Going To Class"
                  name="goingToClass"
                  onChange={onChange}
                >
                  {goingToClass.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Stack>

              <Button
                mt={3}
                onClick={() => {
                  onClose();
                  onAddStudent(studentInfo);
                }}
              >
                Add Student
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Index;
