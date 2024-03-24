import type { ThemeConfig } from "@bg-dev/nuxt-naiveui";
import { theme } from "#tailwind-config";

const themeConfig: ThemeConfig = {
  shared: {
    common: {
      primaryColor: theme.colors.primary[500],
      primaryColorHover: theme.colors.primary[600],
      primaryColorPressed: theme.colors.primary[700],
      hoverColor: theme.colors.primary[300],
      borderRadius: "8px",
    },
    Input: {
      // borderFocus: "1px solid " + theme.colors.primary[500],
      // borderRadius: "6px",
      // boxShadowFocus: "0 0 0 2px " + theme.colors.primary[100],
      // heightMedium: "30px",
      // borderHover: "1px solid " + theme.colors.primary[300],
    },
    Button: {
      borderFocusPrimary: "1px solid " + theme.colors.primary[500],
    },
    Select: {
    },
  },
  light: {},
  dark: {},
};

export { themeConfig };
