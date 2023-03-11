import React, { useState } from "react";
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
} from "@chakra-ui/react";
import InvoiceDate from "./utils/InvoiceDate";
import { MdCurrencyRupee } from "react-icons/md";
import InWords from "./utils/InWords";

const Index = () => {
  const { orderToConfirm } = useStateContext();
  // console.log(orderToConfirm);
  const [recvAmt, setRecvAmt] = useState(0);

  const onChange = (e) => {
    setRecvAmt(e.target.value);
  };
  return (
    <>
      {orderToConfirm !== null ? (
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
          {orderToConfirm.order != "" ? (
            <>
              <Flex
                // bg="gray.300"
                border="1px solid black"
                p={2}
                borderRadius="7pt"
                direction="row"
                justify="space-between"
              >
                <Stack spacing={0.25}>
                  <Text fontWeight={800}>INVOICE #: </Text>

                  <Text fontWeight={800}>BILL TO</Text>
                  <Flex>
                    <Text fontSize={"12pt"}>Student Name: </Text>
                    <Text fontSize={"12pt"} fontWeight={600} ml={1}>
                      {orderToConfirm.order.studentDetails.name != ""
                        ? orderToConfirm.order.studentDetails.name
                        : ""}
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
            </>
          ) : (
            ""
          )}
        </Flex>
      ) : (
        ""
      )}
    </>
  );
};

export default Index;
