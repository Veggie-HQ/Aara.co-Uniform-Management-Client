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

  const onSubmit = (e) => {
    e.preventDefault();
    onClose();
    onAddStudent(studentInfo);
    const existingStudent = localStorage.getItem("Student");
    if (existingStudent) {
      localStorage.setItem("Student", [
        existingStudent,
        studentInfo.name,
        studentInfo.gender,
        studentInfo.goingToClass,
      ]);
    } else {
      localStorage.setItem("Student", [
        studentInfo.name,
        studentInfo.gender,
        studentInfo.goingToClass,
      ]);
    }
  };

  const { onAddStudent } = useStateContext();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="center" justify="center">
              <Text>Enter Student Information</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
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
                    required
                  />
                  <Select
                    placeholder="Select Gender"
                    name="gender"
                    onChange={onChange}
                    required
                  >
                    <option value="boy">Boy</option>
                    <option value="girl">Girl</option>
                    <option value="other">Other</option>
                  </Select>

                  <Select
                    placeholder="Select Going To Class"
                    name="goingToClass"
                    onChange={onChange}
                    required
                  >
                    {goingToClass.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </Stack>

                <Button type="submit" mt={3}>
                  Add Student
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Index;
