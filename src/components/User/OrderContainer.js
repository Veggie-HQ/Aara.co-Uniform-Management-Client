import { firestore } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";
import { Button, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { MdCurrencyRupee } from "react-icons/md";
import EditModal from "@/components/EditModal";

const Index = () => {
  const { USER } = useStateContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ORDERS, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const orderFetcher = async () => {
    setLoading(true);
    if (error) setError("");
    try {
      const orderQuery = query(
        collection(firestore, "clientOrders"),
        where("parentInfo", "==", USER.user.phoneNumber)
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

      console.log("ORDERS: ", ORDERS.orders);
    } catch (error) {
      setError(error.message);
      console.log("orderFetcher Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    // orderFetcher();
  }, []);
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
              <Flex
                key={index}
                width="95%"
                mb={2}
                borderRadius="7pt"
                direction="column"
                align="flex-start"
                bg="orange.200"
                p={2}
              >
                <Flex direction="column" width="100%">
                  <Flex width="100%" justify="space-between" align="center">
                    <Text fontWeight={600} mr={1} fontSize="10pt">
                      Student Name
                    </Text>
                    <Text fontSize="10pt">{item.studentDetails.name}</Text>
                  </Flex>
                  <Flex width="100%" justify="space-between" align="center">
                    <Text fontWeight={600} mr={1} fontSize="10pt">
                      Gender
                    </Text>
                    <Text fontSize="10pt">{item.studentDetails.gender}</Text>
                  </Flex>
                  <Flex width="100%" justify="space-between" align="center">
                    <Text fontWeight={600} mr={1} fontSize="10pt">
                      Going To
                    </Text>
                    <Text fontSize="10pt">
                      {item.studentDetails.goingToClass}
                    </Text>
                  </Flex>
                </Flex>

                <Flex width="100%" direction="column">
                  <Flex
                    direction="row"
                    justify="space-between"
                    borderTop="1px solid black"
                    borderBottom="1px solid black"
                    mb={1}
                    mt={1}
                  >
                    <Text fontWeight={600} mr={1}>
                      Items:
                    </Text>
                    <Text fontWeight={600}>Quantity:</Text>
                  </Flex>

                  {item.cartItems.map((item1, index1) => (
                    <Flex
                      key={index1}
                      width="100%"
                      direction="row"
                      justify="space-between"
                    >
                      <Text>
                        {item1.title} (Size: {item1.size})
                      </Text>
                      <Text>{item1.quantity}</Text>
                    </Flex>
                  ))}
                </Flex>

                <Flex mt={5} align="center">
                  <Text fontWeight={600} mr={1}>
                    Total:
                  </Text>
                  <MdCurrencyRupee />
                  <Text fontWeight={600} mr={1}>
                    {item.total}
                  </Text>
                </Flex>
                <EditModal isOpen={isOpen} onClose={onClose} data={item} />
                <Flex width="100%" align="center" justify="center" mt={1}>
                  <Button
                    fontSize="10pt"
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    Edit Order
                    <Icon as={AiOutlineEdit} ml={1} />
                  </Button>
                </Flex>
              </Flex>
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
