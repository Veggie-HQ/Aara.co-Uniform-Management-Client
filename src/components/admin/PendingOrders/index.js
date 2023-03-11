import { POWrapper, POStyle } from "@/styles/PendingOrderStyles";
import { auth } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";
import { Flex, Text, Button, useDisclosure } from "@chakra-ui/react";

import { signOut } from "firebase/auth";

export default function Index() {
  const { setShowPendingOrders } = useStateContext();
  return (
    <POWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowPendingOrders(false)}
    >
      <POStyle
        layout
        initial={{ x: "-50%" }}
        animate={{ x: 0 }}
        exit={{ x: "-50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Text>Pending Orders Tab</Text>
      </POStyle>
    </POWrapper>
  );
}
