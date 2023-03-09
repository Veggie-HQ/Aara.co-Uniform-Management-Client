import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { MdCurrencyRupee } from "react-icons/md";
import { useStateContext } from "@/lib/context";

const Index = ({ isOpen, onClose, item }) => {
  const { title, price, imageURL, color, gender, size } = item;
  const { increaseQty, decreaseQty, qty, onAdd, setQty } = useStateContext();

  const resetQuantity = () => {
    setQty(1);
  };
  useEffect(() => {
    resetQuantity();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="center" justify="center">
              <Text>{item.title}</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              align="center"
              justify="center"
              direction="column"
              padding={3}
            >
              <Image src={imageURL} alt={title} width="200px" />

              <Flex align="center" mt={2}>
                <MdCurrencyRupee />
                <Text fontWeight={800}>{price}</Text>
              </Flex>

              {title === "T Shirts" && (
                <>
                  <Text mt={4} fontWeight={600}>
                    Select Color
                  </Text>
                  <Select variant="filled" placeholder="Select Color" required>
                    <option value={color[0]}>{color[0]}</option>
                    <option value={color[1]}>{color[1]}</option>
                  </Select>
                </>
              )}

              <Text mt={4} fontWeight={600}>
                Select Gender
              </Text>
              <Select variant="filled" placeholder="Select Color" required>
                <option value={gender[0]}>{gender[0]}</option>
                <option value={gender[1]}>{gender[1]}</option>
                {gender[2] && <option value={gender[2]}>{gender[2]}</option>}
              </Select>

              <Text mt={4} fontWeight={600}>
                Select Size
              </Text>
              <Select variant="filled" placeholder="Select Size" required>
                {size.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>

              <Button bg="orange.300" _hover={{ bg: "orange.100" }} mt={4}>
                Add To Cart
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Index;
