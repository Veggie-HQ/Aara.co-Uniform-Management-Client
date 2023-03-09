import Link from "next/link";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { NavItems } from "@/styles/NavStyles";
// import Cart from "./Cart";
import { useStateContext } from "@/lib/context";
import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import Cart from "../Cart";
const { AnimatePresence, motion } = require("framer-motion");

export default function Nav() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <Flex height="80px" bg="white" align="center" justify="space-evenly">
      <Flex direction="column" align="center">
        <FiUser />
        <h3>Profile</h3>
      </Flex>

      <Box>
        <Link href="/">
          <Image src="/assets/logo.jpg" alt="Aara.co Logo" width="100px" />
        </Link>
      </Box>

      <Flex direction="column" align="center">
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
        </div>

        <h3>Cart</h3>
      </Flex>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </Flex>
  );
}
