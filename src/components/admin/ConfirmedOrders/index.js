import { firestore } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";
import { COStyle, COWrapper } from "@/styles/ConfirmedOrderStyles";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import CCard from "./CCard";

export default function Index() {
  const { setShowConfirmedOrders } = useStateContext();
  const [ORDERS, setOrders] = useState([]);
  const [invoice, setInvoice] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setInvoice(e.target.value);
    if (e.target.value.length <= 13) {
      setError("");
    }
    if (e.target.value.length > 13)
      setError("Phone # is longer than 10 digits");
  };

  const orderFetcher = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (error) setError("");
    try {
      const orderQuery = query(
        collection(firestore, "confirmedOrders"),
        where("invoice_number", "==", Number(invoice))
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

      console.log(ORDERS);
    } catch (error) {
      setError(error.message);
      console.log("orderFetcher Error");
    }
    setLoading(false);
  };
  return (
    <COWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowConfirmedOrders(false)}
    >
      <COStyle
        layout
        initial={{ x: "50%" }}
        animate={{ x: 0 }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={orderFetcher}>
          <Flex direction="column" align="center" justify="center" p={2}>
            <Text mb={3} fontWeight={800}>
              Search for an Order
            </Text>
            <Input
              bg="white"
              onChange={onChange}
              width="80%"
              value={invoice}
              placeholder="Enter Invoice Number"
              _placeholder={{ fontSize: "10pt" }}
            />
            <Button
              type="submit"
              isLoading={loading}
              size="sm"
              mt={2}
              mb={2}
              bg="orange.300"
              _hover={{ bg: "orange.200" }}
            >
              Search for orders
            </Button>
            <Text mt={1} fontWeight={800} fontSize="10pt" color="red.500">
              {error}
            </Text>
          </Flex>
        </form>
        <Flex direction="column" align="center" justify="center" p={2}>
          {ORDERS != ""
            ? ORDERS.orders.map((item, index) => (
                <>
                  <CCard data={item} key={index} />
                  {/* <Text>hello</Text> */}
                </>
              ))
            : ""}
        </Flex>
      </COStyle>
    </COWrapper>
  );
}
