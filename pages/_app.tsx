import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout"
import initAuth from "../utils/firebase/initAuth"
import React, { useState } from "react";
import Login from "./login";

const App = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<boolean>(false)
  initAuth()
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App
