import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3c00",
    },
  },
  fonts: {
    body: "Inter, sans serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "#f1f1f1",
      },
    }),
  },
  components: {},
});
