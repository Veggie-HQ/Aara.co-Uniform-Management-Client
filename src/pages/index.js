import { LKGUKGData } from "@/data/LKGUKG";
import { S1To4Data } from "@/data/S1To4";
import { S5, S6To12Data } from "@/data/S5To12";
import Head from "next/head";

import Item from "@/components/client/Item";
import Login from "@/components/client/Login";
import { useStateContext } from "@/lib/client/context";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import Link from "next/link";

export default function Home() {
  const { showCart, showUser, students, USER, studentSelector } =
    useStateContext();
  const [student, setStudent] = useState(students[0]);

  const onChange = (e) => {
    if (e.target.value >= 0) {
      setStudent((prev) => ({
        ...prev,
        name: students[e.target.value].name,
        gender: students[e.target.value].gender,
        goingToClass: students[e.target.value].goingToClass,
      }));
      studentSelector(students[e.target.value]);
    }
  };

  return (
    <>
      <Head>
        <title>Aara Co Uniforms</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo.jpg" />
      </Head>

      <Flex mt="90px" direction="column">
        {!USER ? (
          <Flex align="center" justify="center" direction="column">
            <Login />
            <Link href="/admin">
              <Button mt="20%" bg="purple.200">
                <Flex align="center">
                  <Text>Admin Login</Text>
                  <Icon as={BsArrowUpRight} ml="2" />
                </Flex>
              </Button>
            </Link>
          </Flex>
        ) : (
          <>
            <Flex
              zIndex={showCart | showUser ? -1 : 1}
              width="80%"
              margin="0px auto"
              direction="column"
            >
              {students.length > 0 ? (
                <>
                  <Text fontWeight={600} align="center" mt={2}>
                    Placing an order for:
                  </Text>
                  <select
                    className="selectTab"
                    placeholder="Select Student"
                    onChange={onChange}
                  >
                    <option value="-1">Select Student</option>

                    {students.map((item, index) => (
                      <>
                        <option key={index} value={index}>
                          {item.name}
                        </option>
                      </>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <Text fontWeight={600} align="center" mt={2}>
                    Visit the Profile Tab to Enter Student Information and begin
                    the Ordering Process
                  </Text>
                </>
              )}
            </Flex>
            {student && (
              <Box mt={2} width="100%">
                {student.length === 0 ? (
                  ""
                ) : (
                  <>
                    {Number(student.goingToClass) >= 1 &&
                    Number(student.goingToClass) <= 4 ? (
                      <>
                        {S1To4Data.map((item, index) => (
                          <>
                            <Item item={item} key={index} />
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    {Number(student.goingToClass) === 5 ? (
                      <>
                        {S5.map((item, index) => (
                          <>
                            <Item item={item} key={index} />
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    {Number(student.goingToClass) > 5 &&
                    Number(student.goingToClass) <= 12 ? (
                      <>
                        {S6To12Data.map((item, index) => (
                          <>
                            <Item item={item} key={index} />
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    {student.goingToClass.includes("LKG") ||
                    student.goingToClass.includes("UKG") ? (
                      <>
                        {LKGUKGData.map((item, index) => (
                          <>
                            <Item item={item} key={index} />
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </Box>
            )}
          </>
        )}
      </Flex>
    </>
  );
}
