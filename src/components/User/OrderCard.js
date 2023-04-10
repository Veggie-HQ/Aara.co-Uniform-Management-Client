import React from "react";
import { Flex, Text, Button, Icon, useDisclosure } from "@chakra-ui/react";

import { MdCurrencyRupee } from "react-icons/md";
import { AiOutlineEdit, AiOutlineDownload } from "react-icons/ai";
import EditModal from "../EditModal";
import Invoice from "./Invoice";
import { jsPDF } from "jspdf";

const OrderCard = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(item);
  const invoiceDownloader = () => {
    let element = document.getElementById("contents");

    let doc = new jsPDF();
    doc.html(element, {
      callback: function (doc) {
        doc.save(`INVOICE #${item.invoice_number}.pdf`);
      },
      margin: [2.5, 0, 0, 10],
      autoPaging: "text",
      x: 0,
      y: 0,
      width: 175,
      windowWidth: 1000,
    });
  };

  return (
    <>
      <Flex
        width="95%"
        mb={2}
        borderRadius="7pt"
        direction="column"
        align="flex-start"
        bg="orange.200"
        p={2}
      >
        <Flex direction="column" width="100%">
          <Flex
            width="100%"
            justify="space-between"
            align="center"
            direction="column"
          >
            {item.confirmed && (
              <Text fontWeight={700}>
                Invoice Number: {item.invoice_number}
              </Text>
            )}
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
            <Text fontSize="10pt">{item.studentDetails.goingToClass}</Text>
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

        <EditModal isOpen={isOpen} onClose={onClose} item={item} />
        <Flex width="100%" align="center" justify="center" mt={1}>
          {item.confirmed === false ? (
            <Button
              isDisabled="true"
              fontSize="10pt"
              onClick={() => {
                onOpen();
              }}
            >
              Edit Order
              <Icon as={AiOutlineEdit} ml={1} />
            </Button>
          ) : (
            <Button
              fontSize="10pt"
              onClick={() => {
                invoiceDownloader();
              }}
            >
              Download Invoice
              <Icon as={AiOutlineDownload} ml={1} />
            </Button>
          )}
        </Flex>
      </Flex>

      <div className="useless">
        <div id="contents">
          <Invoice INV={item.invoice_number} order={item} />
        </div>
      </div>
    </>
  );
};

export default OrderCard;
