import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { MdCurrencyRupee } from "react-icons/md";
import ItemModal from "../ItemModal";
import { useStateContext } from "@/lib/context";

const Index = ({ item }) => {
  const { cartItems } = useStateContext();
  const { title, price, imageURL } = item;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      margin="0px auto"
      padding="10pt"
      height="100px"
      bg="rgba(255,255,255,0.5)"
      mb={2}
      borderRadius="7pt"
      align="center"
      justify="space-between"
      onClick={() => onOpen()}
      _hover={{ cursor: "pointer" }}
    >
      <ItemModal isOpen={isOpen} onClose={onClose} item={item} />
      <Flex align="center" justify="center" width="30%">
        <Image src={imageURL} alt={title} width="50px" />
      </Flex>
      <Flex direction="column" left="0" width="70%">
        <Text fontWeight={600}>{title}</Text>
        <Flex align="center">
          <Text fontWeight={800} mr={1}>
            Price:
          </Text>
          <MdCurrencyRupee />
          <Text fontWeight={800} ml={1}>
            {price}
          </Text>
        </Flex>
        {cartItems.map((cartItem, index) => (
          <>
            <Text
              _hover={{ cursor: "pointer" }}
              mt={2}
              align="center"
              fontSize="9pt"
              fontStyle="italic"
              key={index}
            >
              {item.slug === cartItem.slug &&
                `${cartItem.quantity} ${cartItem.title} of Size ${
                  cartItem.size
                } ${cartItem.quantity > 1 ? "are" : "is"} in the Cart`}
            </Text>
          </>
        ))}

        {/* <Text
          _hover={{ cursor: "pointer" }}
          mt={2}
          align="center"
          fontSize="9pt"
          fontStyle="italic"
        >
          Tap to Add to Cart
        </Text> */}
      </Flex>
    </Flex>
  );
};

export default Index;
