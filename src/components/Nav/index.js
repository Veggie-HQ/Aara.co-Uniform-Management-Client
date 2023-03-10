import Link from "next/link";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { NavItems } from "@/styles/NavStyles";
// import Cart from "./Cart";
import { useStateContext } from "@/lib/context";
import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import Cart from "../Cart";
import User from "../User";
const { AnimatePresence, motion } = require("framer-motion");

export default function Nav() {
  const { showUser, setShowUser, showCart, setShowCart, totalQuantities } =
    useStateContext();

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
      <div onClick={() => setShowUser(true)}>
        <Flex direction="column" align="center">
          <FiUser />
          <h3>Profile</h3>
        </Flex>
      </div>
      <AnimatePresence>{showUser && <User />}</AnimatePresence>

      <Box>
        <Link href="/">
          <Image src="/assets/logo.jpg" alt="Aara.co Logo" width="100px" />
        </Link>
      </Box>

      <div onClick={() => setShowCart(true)}>
        <Flex direction="column" align="center">
          {totalQuantities > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
        </Flex>
        <h3>Cart</h3>
      </div>

      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </Flex>
  );
}
