import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

const EditRow = ({ item, data, onEdit }) => {
  const [qty, setQty] = useState(item.quantity);
  const [size, setSize] = useState(item.size);

  const [changedData, setChangedData] = useState(data);

  const onChangeSize = (e) => {
    setSize(e.target.value);
    onEdit(changedData);
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
            {data.productInfo.map((productData, index) => (
              <>
                {item.slug === productData.slug ? (
                  <>
                    {productData.size.map((itemSize, sizeIndex) => (
                      <option key={sizeIndex}>{itemSize}</option>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </>
            ))}
          </select>
        </Box>
      )}
    </Flex>
  );
};

export default EditRow;
