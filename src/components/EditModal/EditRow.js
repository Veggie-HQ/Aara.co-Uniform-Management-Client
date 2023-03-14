import React, { useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Flex, Text, Input, Box, Button } from "@chakra-ui/react";
import { useStateContext } from "@/lib/context";

const EditRow = ({ item }) => {
  const [qty, setQty] = useState(item.quantity);
  const [size, setSize] = useState(item.size);

  const onChangeSize = (e) => {
    setSize(e.target.value);
    console.log(`SIZE FOR ${item.title} CHANGED FROM ${item.size} to ${size}`);
  };
  const eq =
    item.slug === "S14TieKnot" ||
    item.slug === "S14Belt" ||
    item.slug === "S612TieLong" ||
    item.slug === "S612Belt" ||
    item.slug === "S5TieLong" ||
    item.slug === "S5Belt";

  return (
    <Flex width="100%" align="center" justify="space-evenly" mb={2}>
      <Text fontSize="10pt" width="32%">
        {item.title}
      </Text>

      <Flex width="32%" align="center" justify="space-evenly">
        <Button
          onClick={() => {
            if (qty === 0) return;
            if (qty === 1) setQty(0);
            else {
              setQty((prev) => prev - 1);
            }
          }}
          mr={2}
        >
          -
        </Button>
        <Text mr={2}>{qty}</Text>
        <Button onClick={() => setQty((prev) => prev + 1)}>+</Button>
      </Flex>
      {eq ? (
        <Text align="center" width="32%">
          One Size
        </Text>
      ) : (
        <Box width="32%">
          <select value={size} onChange={onChangeSize}>
            <option value="-1">Select Size</option>
            <option value="42" selected={item.size === "42" ? "selected" : ""}>
              42
            </option>
            <option value="34" selected={item.size === "34" ? "selected" : ""}>
              34
            </option>
            <option value="3" selected={item.size === "3" ? "selected" : ""}>
              3
            </option>
            <option value="30" selected={item.size === "30" ? "selected" : ""}>
              30
            </option>
            <option value="28" selected={item.size === "28" ? "selected" : ""}>
              28
            </option>
          </select>
        </Box>
      )}
    </Flex>
  );
};

export default EditRow;
