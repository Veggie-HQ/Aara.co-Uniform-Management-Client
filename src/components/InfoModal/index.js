import { useStateContext } from "@/lib/context";
import { useState } from "react";

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
import { doc, writeBatch } from "firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const goingToClass = [
  "LKG",
  "UKG",
  "1",
  "2",
  "3",
  "4",
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const { onAddStudent, setShowUser } = useStateContext();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setStudentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (error) setError("");
    try {
      const batch = writeBatch(firestore);

      batch.set(
        doc(firestore, `users/${user.email}/students`, studentInfo.name),
        studentInfo
      );

      await batch.commit();
    } catch (error) {
      console.log("onSubmit Student Info Error", error);
      setError(error.message);
    }
    setLoading(false);
    onClose();
    onAddStudent(studentInfo);
    setShowUser(false);
  };

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

                <Button isLoading={loading} type="submit" mt={3}>
                  Confirm Student
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
