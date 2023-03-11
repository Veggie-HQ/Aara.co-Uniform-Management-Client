import { POWrapper, POStyle } from "@/styles/PendingOrderStyles";
import { auth } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";
import { Flex, Text, Button, useDisclosure, Input } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { useState } from "react";

export default function Index() {
  const { setShowPendingOrders } = useStateContext();
  const [number, setNumber] = useState("+91");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ORDERS, setOrders] = useState([]);

  const onChange = (e) => {
    setNumber(e.target.value);
    if (e.target.value.length <= 13) {
      setError("");
    }
    if (e.target.value.length > 13)
      setError("Phone # is longer than 10 digits");
  };

  const orderFetcher = async () => {
    setLoading(true);
    if (error) setError("");
    try {
      const orderQuery = query(
        collection(firestore, "clientOrders"),
        where("parentInfo", "==", number)
      );
      const orderDocs = await getDocs(orderQuery);
      const orders = orderDocs.docs.flatMap((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders((prev) => ({
        ...prev,
        orders,
      }));
    } catch (error) {
      setError(error.message);
      console.log("orderFetcher Error");
    }
    setLoading(false);
  };

  console.log("ORDERS:", ORDERS);

  return (
    <POWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowPendingOrders(false)}
    >
      <POStyle
        layout
        initial={{ x: "-50%" }}
        animate={{ x: 0 }}
        exit={{ x: "-50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Flex direction="column" align="center" justify="center" p={2}>
          <Text mb={3} fontWeight={800}>
            Search for an Order
          </Text>
          <Input
            bg="white"
            onChange={onChange}
            width="80%"
            value={number}
            placeholder="Enter Parent's Mobile Number"
            _placeholder={{ fontSize: "10pt" }}
          />
          <Button
            onClick={orderFetcher}
            isLoading={loading}
            size="sm"
            mt={2}
            bg="orange.300"
            _hover={{ bg: "orange.200" }}
          >
            Search for orders
          </Button>
          <Text mt={1} fontWeight={800} fontSize="10pt" color="red.500">
            {error}
          </Text>
        </Flex>
      </POStyle>
    </POWrapper>
  );
}
