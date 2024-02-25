import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f7f6fc",
          "100": "#f1eff8",
          "200": "#e4e1f3",
          "300": "#cec9e9",
          "400": "#b5a9dc",
          "500": "#9a86cc",
          "600": "#8264b9",
          "700": "#7758a9",
          "800": "#634a8d",
          "900": "#523e74",
          "950": "#34274e",
        },
      },
    },
  },
};
