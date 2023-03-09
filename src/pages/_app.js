import { theme } from "@/chakra/theme";
import { ChakraProvider } from "@chakra-ui/react";
import Nav from "@/components/Nav";
import { StateContext } from "@/lib/context";

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <ChakraProvider theme={theme}>
        <Nav />
        <Component {...pageProps} />
      </ChakraProvider>
    </StateContext>
  );
}
