import {
  CartStyle,
  Card,
  EmptyStyle,
  CartWrapper,
  CardInfo,
} from "@/styles/CartStyles";
import { Quantity } from "@/styles/ProductDetails";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { MdCurrencyRupee } from "react-icons/md";
import { useStateContext } from "@/lib/context";
import { Flex, Image, Text, Box, Button } from "@chakra-ui/react";

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();

  //Payment
  // const handleCheckout = async () => {
  //   const stripePromise = await getStripe();
  //   const response = await fetch("/api/stripe", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(cartItems),
  //   });
  //   const data = await response.json();
  //   await stripePromise.redirectToCheckout({ sessionId: data.id });
  // };

  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        layout
        initial={{ x: "50%" }}
        animate={{ x: 0 }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Flex align="center" justify="center">
              <Text align="center">You have no items in your cart!</Text>
            </Flex>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              <Card
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
                key={item.slug}
              >
                <Image src={item.imageURL} alt={item.title} width="30px" />
                <CardInfo>
                  <Text fontSize="12pt">{item.title}</Text>
                  {item.color && (
                    <Text fontSize="12pt">Color: {item.color}</Text>
                  )}
                  <Text fontSize="12pt">Gender: {item.gender}</Text>
                  <Text fontSize="12pt">Size: {item.size}</Text>

                  <Flex align="center">
                    <MdCurrencyRupee />
                    <Text fontWeight={800}>{item.price}</Text>
                  </Flex>

                  <Quantity>
                    <Flex direction="column">
                      <span>Quantity</span>
                      <Flex align="center" justify="flex-start">
                        <Button onClick={() => onRemove(item)}>
                          <AiFillMinusCircle />
                        </Button>
                        <Text>{item.quantity}</Text>
                        <Button onClick={() => onAdd(item, 1)}>
                          <AiFillPlusCircle />
                        </Button>
                      </Flex>
                    </Flex>
                  </Quantity>
                </CardInfo>
              </Card>
            );
          })}

        {cartItems.length >= 1 && (
          <div>
            <Flex align="center">
              <Text fontWeight={800}>Subtotal</Text>
              <MdCurrencyRupee />
              <Text fontWeight={800}>{totalPrice}</Text>
            </Flex>

            <Button mt={4} bg="orange.300" onClick={() => {}} width="100%">
              Proceed with Order
            </Button>
          </div>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
