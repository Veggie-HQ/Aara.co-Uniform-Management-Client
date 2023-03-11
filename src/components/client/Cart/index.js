import Confirmation from "@/components/client/Confirmation";
import { firestore } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/client/context";
import {
  Card,
  CardInfo,
  CartStyle,
  CartWrapper,
  EmptyStyle,
} from "@/styles/CartStyles";
import { Quantity } from "@/styles/ProductDetails";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { doc, runTransaction } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    cartItems,
    setShowCart,
    onAdd,
    onRemove,
    totalPrice,
    STUDENT,
    USER,
    setCartItems,
    setTotalQuantitites,
    gst5Total,
    gst12Total,
    setGst5Total,
    setGst12Total,
    setTotalPrice,
  } = useStateContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitOrder = async () => {
    if (error) setError("");
    setLoading(true);

    try {
      const commDocRef = doc(
        firestore,
        "clientOrders",
        `${USER.user.phoneNumber}-${STUDENT.student.name}`
      );
      await runTransaction(firestore, async (transaction) => {
        const commDoc = await transaction.get(commDocRef);
        if (commDoc.exists()) {
          throw new Error(`This Record Exists`);
        }

        transaction.set(commDocRef, {
          cartItems: cartItems,
          studentDetails: STUDENT.student,
          parentInfo: USER.user.phoneNumber,
          subtotal: totalPrice,
          gst5Total: gst5Total,
          gst12Total: gst12Total,
          roundOff:
            Math.round(totalPrice + gst5Total + gst12Total) -
            (totalPrice + gst5Total + gst12Total),
          total: Math.round(totalPrice + gst5Total + gst12Total),
        });

        setShowCart(false);
        setCartItems([]);
        setTotalQuantitites(0);
        setGst5Total(0.0);
        setGst12Total(0.0);
        setTotalPrice(0);
        router.push(`/success`);
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

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
        <Box bg="purple.200" mt={5} p={1} borderRadius="7pt">
          <Text align="center" fontWeight={800}>
            Placing Orders for:{" "}
          </Text>
          {STUDENT && (
            <Text fontWeight={800} align="center" color="orange.500">
              {STUDENT.student.name}
            </Text>
          )}
        </Box>
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
          <Flex direction="column" mb="40%">
            <Flex align="center">
              <Text fontWeight={800}>Subtotal</Text>
              <MdCurrencyRupee />
              <Text fontWeight={800}>{totalPrice}</Text>
            </Flex>
            <Flex align="center">
              <Text fontWeight={800}>CGST @2.5</Text>
              <MdCurrencyRupee />
              <Text fontWeight={800}>{gst5Total / 2}</Text>
            </Flex>
            <Flex align="center">
              <Text fontWeight={800}>SGST @2.5</Text>
              <MdCurrencyRupee />
              <Text fontWeight={800}>{gst5Total / 2}</Text>
            </Flex>
            <Flex align="center">
              <Text fontWeight={800}>CGST @6</Text>
              <MdCurrencyRupee />
              <Text fontWeight={800}>{gst12Total / 2}</Text>
            </Flex>
            <Flex align="center">
              <Text fontWeight={800}>SGST @6</Text>
              <MdCurrencyRupee />
              <Text fontWeight={800}>{gst12Total / 2}</Text>
            </Flex>
            <Flex align="center">
              <Text fontWeight={800}>Round Off</Text>
              <MdCurrencyRupee />
              <Text fontWeight={800}>
                {Math.round(totalPrice + gst5Total + gst12Total) -
                  (totalPrice + gst5Total + gst12Total)}
              </Text>
            </Flex>
            <Flex align="center">
              <Text fontWeight={800}>Total Amount</Text>
              <MdCurrencyRupee />
              <Text fontWeight={800}>
                {Math.round(totalPrice + gst5Total + gst12Total)}
              </Text>
            </Flex>

            <Confirmation
              isOpen={isOpen}
              onClose={onClose}
              onConfirm={submitOrder}
            />

            <Button
              isLoading={loading}
              mt={4}
              bg="orange.300"
              onClick={() => {
                onOpen();
              }}
              width="100%"
            >
              Proceed with Order
            </Button>

            {error && (
              <Text
                align="center"
                color="red"
                fontSize="10pt"
                fontWeight={800}
                mt={2}
              >
                {error}
              </Text>
            )}
          </Flex>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
