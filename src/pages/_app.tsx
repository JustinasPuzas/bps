import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import SideBar from "../components/Sidebar/SideBar";
import { ThemeProvider } from "@mui/material/styles";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#a04fc9",
      main: "#8240a3",
      dark: "#592b6f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#ffffff",
      contrastText: "#000",
    },
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <SideBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default MyApp;
