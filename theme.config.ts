import type { ThemeConfig } from "@bg-dev/nuxt-naiveui";
import { theme } from "#tailwind-config";

const themeConfig: ThemeConfig = {
  shared: {
    Input: {
      borderFocus: "1px solid " + theme.colors.primary[500],
      borderRadius: "6px",
      boxShadowFocus: "0 0 0 2px " + theme.colors.primary[100],
      //   heightMedium: '30px'
      borderHover: "1px solid " + theme.colors.primary[300],
    },
    Button:{
    },
  },
  light: {},
  dark: {},
};

export { themeConfig };
