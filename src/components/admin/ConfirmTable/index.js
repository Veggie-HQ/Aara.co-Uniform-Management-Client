import React, { useEffect, useState } from "react";
import { useStateContext } from "@/lib/context";
import {
  Flex,
  Stack,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
  Input,
  Button,
} from "@chakra-ui/react";
import InvoiceDate from "./utils/InvoiceDate";
import { MdCurrencyRupee } from "react-icons/md";
import InWords from "./utils/InWords";
// import { firestore } from "@/firebase/clientApp";
// import { doc, runTransaction } from "firebase/firestore";

const Index = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [INV, SetINV] = useState(0);
  const [download, allowDownload] = useState(false);

  const { orderToConfirm } = useStateContext();
  // console.log(orderToConfirm);
  const [recvAmt, setRecvAmt] = useState(0);

  const onChange = (e) => {
    setRecvAmt(e.target.value);
  };
  let currKey = "";
  let currIndex;
  let IN;
  let counter = 1;

  async function PushOrderToDB(order_details) {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_REALTIME_1, {
        method: "POST",
        body: JSON.stringify(order_details),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      currKey = data["name"];
      // console.log("pushed1");

      const res1 = await fetch(process.env.NEXT_PUBLIC_REALTIME_1);
      // console.log("fetching");
      const data1 = await res1.json().then((res) => {
        // console.log("fetching 2");
        let x = Object.keys(res);
        for (let i = 0; i < x.length; i++) {
          // console.log(x[i] + " : " + currKey);
          if (x[i] === currKey) {
            // console.log("curr", currKey);
            currIndex = i;

            break;
          }
        }
      });

      // CHANGE INVOICE NUMBER HERE
      IN = 127 + currIndex;

      let modDetails = {
        ...order_details,
        invoice_number: IN,
      };

      const res2 = await fetch(process.env.NEXT_PUBLIC_REALTIME_2, {
        method: "POST",
        body: JSON.stringify(modDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data2 = await res2.json();
      // console.log("pushed2");
      SetINV(IN);

      setTimeout(() => {
        // allowDownload(true);
      }, 750);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <Flex width="100%" justify="center" align="center"></Flex>
      {Object.keys(orderToConfirm).length > 0 ? (
        <Flex
          p={3}
          width="80%"
          margin="30px auto 0px auto"
          bg="rgb(152 151 151 / 25%)"
          borderRadius="7pt"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          backdropFilter="blur(5px)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          direction="column"
        >
          {Object.keys(orderToConfirm).length > 0 != "" ? (
            <>
              <Flex
                // bg="gray.300"
                border="1px solid black"
                p={2}
                borderRadius="7pt"
                direction="row"
                justify="space-between"
              >
                {Object.keys(orderToConfirm.order.studentDetails).length > 0 ? (
                  <>
                    <Stack spacing={0.25}>
                      <Text fontWeight={800}>INVOICE #: </Text>

                      <Text fontWeight={800}>BILL TO</Text>
                      <Flex>
                        <Text fontSize={"12pt"}>Student Name: </Text>
                        <Text fontSize={"12pt"} fontWeight={600} ml={1}>
                          {orderToConfirm.order.studentDetails.name}
                        </Text>
                      </Flex>
                      <Flex>
                        <Text fontSize={"12pt"}>Student Gender: </Text>
                        <Text fontSize={"12pt"} fontWeight={600} ml={1}>
                          {orderToConfirm.order.studentDetails.gender}
                        </Text>
                      </Flex>
                      <Flex>
                        <Text fontSize={"12pt"}>Going to Class: </Text>
                        <Text fontSize={"12pt"} fontWeight={600} ml={1}>
                          {orderToConfirm.order.studentDetails.goingToClass}
                        </Text>
                      </Flex>
                    </Stack>
                  </>
                ) : (
                  ""
                )}

                <InvoiceDate />
              </Flex>

              <Flex mt={5}>
                <TableContainer width="100%">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th color="black">Item</Th>
                        <Th color="black">Size</Th>
                        <Th color="black" isNumeric>
                          Quantity
                        </Th>
                        <Th color="black" isNumeric>
                          Rate
                        </Th>
                        <Th color="black" isNumeric>
                          Amount
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orderToConfirm.order.cartItems.map((item, index) => (
                        <Tr key={index}>
                          <Td>{item.title}</Td>
                          <Td>{item.size}</Td>
                          <Td isNumeric>{item.quantity}</Td>
                          <Td isNumeric>{item.price}</Td>
                          <Td isNumeric>{item.quantity * item.price}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>

              <Flex width="100%" mt={3} justify="space-between">
                <Flex width="75%"></Flex>

                <Flex width="25%" direction="column">
                  <Flex align="center" justify="space-between">
                    <Text fontSize={"10pt"} fontWeight={600} ml={3}>
                      Taxable Amount:
                    </Text>
                    <Flex align="center">
                      <MdCurrencyRupee />
                      <Text fontSize={"10pt"} fontWeight={600}>
                        {orderToConfirm.order.subtotal}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex align="center" justify="space-between">
                    <Text fontSize={"10pt"} fontWeight={600} ml={3}>
                      CGST @2.5%:
                    </Text>
                    <Flex align="center">
                      <MdCurrencyRupee />
                      <Text fontSize={"10pt"} fontWeight={600}>
                        {orderToConfirm.order.gst5Total / 2}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex align="center" justify="space-between">
                    <Text fontSize={"10pt"} fontWeight={600} ml={3}>
                      SGST @2.5%:
                    </Text>
                    <Flex align="center">
                      <MdCurrencyRupee />
                      <Text fontSize={"10pt"} fontWeight={600}>
                        {orderToConfirm.order.gst5Total / 2}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex align="center" justify="space-between">
                    <Text fontSize={"10pt"} fontWeight={600} ml={3}>
                      CGST @6%:
                    </Text>
                    <Flex align="center">
                      <MdCurrencyRupee />
                      <Text fontSize={"10pt"} fontWeight={600}>
                        {orderToConfirm.order.gst12Total / 2}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex align="center" justify="space-between">
                    <Text fontSize={"10pt"} fontWeight={600} ml={3}>
                      SGST @6%:
                    </Text>
                    <Flex align="center">
                      <MdCurrencyRupee />
                      <Text fontSize={"10pt"} fontWeight={600}>
                        {orderToConfirm.order.gst12Total / 2}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex
                    align="center"
                    justify="space-between"
                    borderTop="1px solid black"
                    borderBottom="1px solid black"
                    p={1}
                    mt={1}
                  >
                    <Text fontSize={"10pt"} fontWeight={800}>
                      TOTAL AMOUNT:
                    </Text>
                    <Flex align="center">
                      <MdCurrencyRupee />
                      <Text fontSize={"10pt"} fontWeight={600}>
                        {orderToConfirm.order.total}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex mt={4} p={1} direction="column" align="center">
                    <Text fontSize={"10pt"} fontWeight={600}>
                      Enter Received Amount:
                    </Text>
                    <Input
                      value={recvAmt}
                      onChange={onChange}
                      mt={1}
                      border="1px solid black"
                    />
                    <Text fontSize={"10pt"} fontWeight={600} mt={1}>
                      Balance: {orderToConfirm.order.total - recvAmt}
                    </Text>
                  </Flex>

                  <Flex mt={4} p={1} direction="column" align="center">
                    <Text fontSize={"10pt"} fontWeight={600}>
                      Total Amount in Words:
                    </Text>
                    <InWords amount={orderToConfirm.order.total} />
                  </Flex>
                </Flex>
              </Flex>
              <Flex width="100%" align="center" justify="center">
                <Button
                  bg="orange.300"
                  _hover={{ bg: "orange.100" }}
                  onClick={() => PushOrderToDB(orderToConfirm.order)}
                  isLoading={loading}
                >
                  Confirm Order
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
            </>
          ) : (
            ""
          )}
        </Flex>
      ) : (
        // <Text>DATA IS NULL</Text>
        ""
      )}
    </>
  );
};

export default Index;
