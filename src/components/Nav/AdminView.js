import Link from "next/link";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { useStateContext } from "@/lib/context";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Cart from "../client/Cart";
import User from "../client/User";
const { AnimatePresence, motion } = require("framer-motion");

const AdminView = () => {
  const { ADMIN } = useStateContext();
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
      {ADMIN && (
        <>
          <div onClick={() => setShowUser(true)}>
            <Flex direction="column" align="center">
              <FiUser />
              <Text _hover={{ cursor: "pointer" }}>Admin</Text>
            </Flex>
          </div>
          {/* <AnimatePresence>{showUser && <User />}</AnimatePresence> */}
        </>
      )}

      <Box>
        <Link href="/">
          <Image src="/assets/logo.jpg" alt="Aara.co Logo" width="100px" />
        </Link>
      </Box>

      {ADMIN && (
        <>
          <div onClick={() => setShowCart(true)}>
            <Flex direction="column" align="center">
              <FiShoppingBag />
            </Flex>
            <Text _hover={{ cursor: "pointer" }}>Cart</Text>
          </div>
          {/* <AnimatePresence>{showCart && <Cart />}</AnimatePresence> */}
        </>
      )}
    </Flex>
  );
};

export default AdminView;
