import { theme } from "@/chakra/theme";
import { ChakraProvider } from "@chakra-ui/react";
import Nav from "@/components/Nav";
import { StateContext } from "@/lib/context";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <ChakraProvider theme={theme}>
        <Toaster />
        <Nav />
        <Component {...pageProps} />
      </ChakraProvider>
    </StateContext>
  );
}
