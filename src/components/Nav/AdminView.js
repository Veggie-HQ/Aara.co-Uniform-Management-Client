import Link from "next/link";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useStateContext } from "@/lib/context";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import ConfirmedOrdersTab from "../admin/ConfirmedOrders";
import PendingOrdersTab from "../admin/PendingOrders";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useEffect } from "react";

const { AnimatePresence, motion } = require("framer-motion");

const AdminView = () => {
  const [user] = useAuthState(auth);

  const {
    ADMIN,
    showConfirmedOrders,
    setShowConfirmedOrders,
    showPendingOrders,
    setShowPendingOrders,
    totalConfirmedOrders,
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
      {ADMIN || user ? (
        <>
          <div onClick={() => setShowPendingOrders(true)}>
            <Flex direction="column" align="center">
              <AiOutlineSearch />
              <Text _hover={{ cursor: "pointer" }}>Pending Orders</Text>
            </Flex>
          </div>
          <AnimatePresence>
            {showPendingOrders && <PendingOrdersTab />}
          </AnimatePresence>
        </>
      ) : (
        ""
      )}

      <Flex align="center">
        <Link href="/admin">
          <Image src="/assets/logo.jpg" alt="Aara.co Logo" width="100px" />
        </Link>
      </Flex>

      {ADMIN && (
        <>
          <div onClick={() => setShowConfirmedOrders(true)}>
            <Flex direction="column" align="center">
              {totalConfirmedOrders > 0 && (
                <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
                  {totalConfirmedOrders}
                </motion.span>
              )}
              <FaFileInvoiceDollar />
            </Flex>
            <Text _hover={{ cursor: "pointer" }}>Confirmed Orders</Text>
          </div>
          <AnimatePresence>
            {showConfirmedOrders && <ConfirmedOrdersTab />}
          </AnimatePresence>
        </>
      )}
    </Flex>
  );
};

export default AdminView;
