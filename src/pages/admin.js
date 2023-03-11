import { LKGUKGData } from "@/data/LKGUKG";
import { S1To4Data } from "@/data/S1To4";
import { S5, S6To12Data } from "@/data/S5To12";
import Head from "next/head";

import Item from "@/components/client/Item";
import Login from "@/components/admin/Login";
import { useStateContext } from "@/lib/context";
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
        <Flex align="center" justify="center" direction="column">
          <Login />
        </Flex>
      </Flex>
    </>
  );
}
