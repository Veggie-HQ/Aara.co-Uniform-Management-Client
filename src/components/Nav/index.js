import { useStateContext } from "@/lib/context";

import { Box, Flex, Image } from "@chakra-ui/react";
import Link from "next/link";

import ClientView from "./ClientView";

export default function Nav() {
  const { USER } = useStateContext();

  return (
    <Flex
      height="80px"
      bg="white"
      align="center"
      justify="space-evenly"
      top="0"
      position="fixed"
      width="100%"
      zIndex={999}
    >
      <Box>
        <Link href="/">
          <Image src="/assets/logo.jpg" alt="Aara.co Logo" width="100px" />
        </Link>
      </Box>

      {USER && <ClientView />}
    </Flex>
  );
}
