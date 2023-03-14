import React, { useState } from "react";
import { Flex, Text, Input } from "@chakra-ui/react";

const EditRow = ({ item }) => {
  const [qty, setQty] = useState(item.quantity);
  const onChange = (e) => {
    setQty(e.target.value);
    console.log(
      `QTY FOR ${item.title} CHANGED FROM ${item.quantity} to ${qty}`
    );
  };
  return (
    <Flex width="100%" align="center" justify="space-evenly" mb={2}>
      <Text fontSize="10pt" width="32%">
        {item.title}
      </Text>
      <Input
        width="32%"
        type="number"
        border="1px solid black"
        onChange={onChange}
        value={qty}
      />
      <select width="33%">
        <option value="-1">Select Size</option>
      </select>
    </Flex>
  );
};

export default EditRow;
