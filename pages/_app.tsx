import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout"
import initAuth from "../utils/initAuth"
import React, { useState } from "react";
import Login from "./login";

initAuth()


const App = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<boolean>(false)

  if (!user) {
    return (
      <Login setUser={setUser}/>
    )
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App
