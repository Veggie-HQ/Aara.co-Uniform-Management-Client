import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useStateContext } from "@/lib/context";

const InfoContainer = ({ info }) => {
  const { students } = useStateContext();

  return (
    <Flex borderRadius="7pt" width="95%" align="center" direction="column">
      {students.length < 1 ? (
        <Text align="center" fontWeight={800}>
          Currently No Student Information Exists
        </Text>
      ) : (
        <>
          {students.map((item, index) => (
            <Flex
              width="95%"
              mb={2}
              borderRadius="7pt"
              direction="column"
              key={index}
              align="flex-start"
              bg="purple.300"
              p={2}
            >
              <Flex>
                <Text fontWeight={600} mr={1}>
                  Name:{" "}
                </Text>
                <Text>{item.name}</Text>
              </Flex>
              <Flex>
                <Text fontWeight={600} mr={1}>
                  Gender:{" "}
                </Text>
                <Text>{item.gender}</Text>
              </Flex>
              <Flex>
                <Text fontWeight={600} mr={1}>
                  Going To Class:{" "}
                </Text>
                <Text>{item.goingToClass}</Text>
              </Flex>
            </Flex>
          ))}
        </>
      )}
    </Flex>
  );
};

export default InfoContainer;
