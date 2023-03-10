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
  const { increaseQty, decreaseQty, qty, onAdd, setQty } = useStateContext();

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

  const resetQuantity = () => {
    setQty(1);
  };
  useEffect(() => {
    resetQuantity();
  }, []);

  const notify = () => {
    toast.success(`${qty} ${title} added to your cart.`, {
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
      <Modal isOpen={isOpen} onClose={onClose}>
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

                {title === "T Shirts" && (
                  <>
                    <Text mt={4} fontWeight={600}>
                      Select Color
                    </Text>
                    <Select
                      variant="filled"
                      placeholder="Select Color"
                      required
                      name="color"
                      onChange={onChange}
                    >
                      <option value={color[0]}>{color[0]}</option>
                      <option value={color[1]}>{color[1]}</option>
                    </Select>
                  </>
                )}

                {/* <Text mt={4} fontWeight={600}>
                Select Gender
              </Text>
              <Select
                variant="filled"
                placeholder="Select Color"
                required
                name="gender"
                onChange={onChange}
              >
                <option value={gender[0]}>{gender[0]}</option>
                <option value={gender[1]}>{gender[1]}</option>
                {gender[2] && <option value={gender[2]}>{gender[2]}</option>}
              </Select> */}

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
                    <Button>
                      <AiFillPlusCircle onClick={increaseQty} />
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
