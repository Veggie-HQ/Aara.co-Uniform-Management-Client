import Link from "next/link";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { useStateContext } from "@/lib/client/context";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Cart from "../client/Cart";
import User from "../client/User";
const { AnimatePresence, motion } = require("framer-motion");

export default function Nav() {
  const {
    showUser,
    setShowUser,
    showCart,
    setShowCart,
    totalQuantities,
    USER,
  } = useStateContext();

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
      {USER && (
        <>
          <div onClick={() => setShowUser(true)}>
            <Flex direction="column" align="center">
              <FiUser />
              <Text _hover={{ cursor: "pointer" }}>Profile</Text>
            </Flex>
          </div>
          <AnimatePresence>{showUser && <User />}</AnimatePresence>
        </>
      )}

      <Box>
        <Link href="/">
          <Image src="/assets/logo.jpg" alt="Aara.co Logo" width="100px" />
        </Link>
      </Box>

      {USER && (
        <>
          <div onClick={() => setShowCart(true)}>
            <Flex direction="column" align="center">
              {totalQuantities > 0 && (
                <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
                  {totalQuantities}
                </motion.span>
              )}
              <FiShoppingBag />
            </Flex>
            <Text _hover={{ cursor: "pointer" }}>Cart</Text>
          </div>
        </>
      )}

      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </Flex>
  );
}
