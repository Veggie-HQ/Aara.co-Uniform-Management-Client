import React, { useEffect, useState } from "react";
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
import { Quantity } from "@/styles/ProductDetails";
import { MdCurrencyRupee } from "react-icons/md";
import { useStateContext } from "@/lib/context";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import toast from "react-hot-toast";

const Index = ({ isOpen, onClose, item }) => {
  const { slug, title, price, imageURL, color, gender, size } = item;
  const { increaseQty, decreaseQty, qty, onAdd, setQty, cartItems } =
    useStateContext();

  const [product, setProduct] = useState({
    slug: slug,
    title: title,
    price: Number(price),
    imageURL: imageURL,
    color: "",
    gender: "",
    size: "",
  });

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("CART ITEMS:", cartItems);

  const resetQuantity = () => {
    setQty(1);
  };
  useEffect(() => {
    resetQuantity();
  }, []);

  const notify = () => {
    // toast.success(`${qty} ${title} added to your cart.`, {
    //   duration: 1500,
    // });
    toast(`${qty} ${title} added to your cart.`, {
      icon: "✅",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      duration: 1500,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(product, qty);
    onClose();
    notify();
    setQty(1);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="center" justify="center">
              <Text>{item.title}</Text>
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
                <Image src={imageURL} alt={title} width="200px" />

                <Flex align="center" mt={2}>
                  <MdCurrencyRupee />
                  <Text fontWeight={800}>{price}</Text>
                </Flex>

                <Text mt={4} fontWeight={600}>
                  Select Size
                </Text>
                <Select
                  variant="filled"
                  placeholder="Select Size"
                  required
                  name="size"
                  onChange={onChange}
                >
                  {size.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>

                <Text mt={4} fontWeight={600}>
                  Quantity
                </Text>
                <Quantity>
                  <Flex align="center" justify="space-evenly">
                    <Button onClick={decreaseQty} mr={2}>
                      <AiFillMinusCircle />
                    </Button>
                    <Text mr={2}>{qty}</Text>
                    <Button onClick={increaseQty}>
                      <AiFillPlusCircle />
                    </Button>
                  </Flex>
                </Quantity>

                <Button
                  type="submit"
                  bg="orange.300"
                  _hover={{ bg: "orange.100" }}
                  mt={4}
                >
                  Add To Cart
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
