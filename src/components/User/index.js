import { EmptyStyle } from "@/styles/CartStyles";
import { UserStyle, UserWrapper } from "@/styles/UserStyles";
//Import State
import { useStateContext } from "@/lib/context";
import { Flex, Text } from "@chakra-ui/react";

export default function User() {
  const { setShowUser, cartItems } = useStateContext();

  //Payment
  // const handleCheckout = async () => {
  //   const stripePromise = await getStripe();
  //   const response = await fetch("/api/stripe", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(cartItems),
  //   });
  //   const data = await response.json();
  //   await stripePromise.redirectToCheckout({ sessionId: data.id });
  // };

  return (
    <UserWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowUser(false)}
    >
      <UserStyle
        layout
        initial={{ x: "-50%" }}
        animate={{ x: 0 }}
        exit={{ x: "0%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Flex align="center" justify="center">
              <Text align="center">User Profile</Text>
            </Flex>
          </EmptyStyle>
        )}
      </UserStyle>
    </UserWrapper>
  );
}
