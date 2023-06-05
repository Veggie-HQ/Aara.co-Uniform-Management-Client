import { firestore } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import OrderCard from "./OrderCard";

const Index = () => {
  const { phoneNumber } = useStateContext();
  const [ORDERS, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const orderFetcher = async () => {
    setLoading(true);
    if (error) setError("");
    try {
      const orderQuery = query(
        collection(firestore, "clientOrders"),
        where("parentInfo", "==", phoneNumber)
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

  return (
    <Flex borderRadius="7pt" width="100%" align="center" direction="column">
      <Flex width="100%" align="center" justify="center" mt={1} mb={2}>
        <Button isLoading={loading} fontSize="10pt" onClick={orderFetcher}>
          Refresh Orders
          <Icon as={BiRefresh} ml={1} height="10pt" />
        </Button>
      </Flex>

      {ORDERS != ""
        ? ORDERS.orders.map((item, index) => (
            <>
              <OrderCard item={item} key={index} />
            </>
          ))
        : ""}

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
  );
};

export default Index;
