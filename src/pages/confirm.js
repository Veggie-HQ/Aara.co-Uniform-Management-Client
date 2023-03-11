import React from "react";
import { auth } from "@/firebase/clientApp";
import { User, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useStateContext } from "@/lib/context";
import { Flex, Text, Box } from "@chakra-ui/react";
import ConfirmTable from "@/components/admin/ConfirmTable";
import Link from "next/link";

const Confirm = () => {
  const [user] = useAuthState(auth);
  const { showConfirmedOrders, showPendingOrders, orderToConfirm } =
    useStateContext();
  const logout = async () => {
    await signOut(auth);
  };
  console.log("ORDERTOCONFIRM", orderToConfirm);
  return (
    <>
      <Box mt="90px">
        <Flex width="80%" margin="0px auto" direction="column">
          <Text fontWeight={600} align="center" mt={2}>
            Select an order to view it&apos;s details
          </Text>
        </Flex>

        {orderToConfirm ? <ConfirmTable /> : ""}

        {user && (
          <Flex
            zIndex={showConfirmedOrders | showPendingOrders ? -1 : 999}
            bg="orange.200"
            width="10%"
            p={2}
            bottom="0"
            right="0"
            position={"fixed"}
            mt="20%"
            // zIndex={999}
            align="center"
            justify="center"
          >
            <Link href="/admin">
              <Text
                transition="0.4s"
                cursor="pointer"
                onClick={() => logout()}
                _hover={{ transform: "translateY(-5px)" }}
              >
                sign out
              </Text>
            </Link>
          </Flex>
        )}
      </Box>
    </>
  );
};

export default Confirm;
