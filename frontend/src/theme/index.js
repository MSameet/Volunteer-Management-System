import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  typography: {
    fontFamily: "Montserrat , sans-serif",
    textTransform: "uppercase",
    h1: {
      fontSize: "72px",
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: { textTransform: "capitalize" },
    body1: {
      fontFamily: "Inter, sans-serif",
    },
    body2: {
      fontFamily: "Inter, sans-serif",
    },
    subtitle1: {
      fontFamily: "Inter, sans-serif",
    },
    subtitle2: {
      fontFamily: "Inter, sans-serif",
    },
    caption: {
      textTransform: "capitalize",
    },
    overline: {
      textTransform: "capitalize",
    },
  },
});

theme = responsiveFontSizes(theme);
export { theme };
