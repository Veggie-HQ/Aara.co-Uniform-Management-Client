import Confirmation from "@/components/client/Confirmation";
import { firestore } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";
import {
  COCard,
  COCardInfo,
  COStyle,
  COWrapper,
  EmptyCOStyle,
} from "@/styles/ConfirmedOrderStyles";
import { Quantity } from "@/styles/ProductDetails";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { doc, runTransaction } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

export default function Index() {
  const { setShowConfirmedOrders } = useStateContext();

  return (
    <COWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowConfirmedOrders(false)}
    >
      <COStyle
        layout
        initial={{ x: "50%" }}
        animate={{ x: 0 }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Text>Confirmed Orders Tab Here</Text>
      </COStyle>
    </COWrapper>
  );
}
