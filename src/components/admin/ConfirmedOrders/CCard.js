import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { ImDownload3 } from "react-icons/im";
import { IoMdBuild } from "react-icons/io";
import Invoice from "./Invoice";
import { jsPDF } from "jspdf";

const CCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [dload, setdload] = useState(false);

  const invoiceDownloader = () => {
    let element = document.getElementById("contents");
    let b = document.getElementById("remBalance");
    b.style.display = "none";
    console.log("downlaodig");
    // let h = document.getElementById("invoiceheader");
    // h.classList.remove("useless");

    let doc = new jsPDF();
    doc.html(element, {
      callback: function (doc) {
        doc.save(`INVOICE #${data.invoice_number}.pdf`);
      },
      margin: [10, 0, 0, 20],
      autoPaging: "text",
      x: 0,
      y: 0,
      width: 175,
      windowWidth: 1000,
    });

    // setTimeout(() => {
    //   window.location.reload();
    // }, 3000);
  };

  return (
    <>
      <Flex
        width="80%"
        bg="purple.300"
        borderRadius={"7pt"}
        p={2}
        height="100%"
      >
        <Flex width="80%" direction={"column"}>
          <Text fontWeight={600}>INVOICE #: {data.invoice_number}</Text>
          <Text fontWeight={600}>Student Name: {data.studentDetails.name}</Text>
          <Text fontWeight={600}>Parent Mobile #: {data.parentInfo}</Text>
        </Flex>
        <Flex justify="center" align="center" width="20%" top="50%">
          <Button
            onClick={() => {
              console.log(data);
              setClick(true);
            }}
          >
            {/* <Icon as={IoMdBuild} /> */}
            Fetch
          </Button>
        </Flex>
      </Flex>
      <div id="test" className="useless">
        {click && <Invoice data={data} download={dload} />}
      </div>
      <Button bg="orange.300" mt={2} onClick={() => invoiceDownloader()}>
        <Flex align="center">
          <Icon as={ImDownload3} mr={1} onClick={() => invoiceDownloader()} />
          Download
        </Flex>
      </Button>
    </>
  );
};

export default CCard;
