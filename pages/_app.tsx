import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout"
import { NextPage } from "next";
import initAuth from "../utils/initAuth"
import {withAuthUser} from 'next-firebase-auth'

initAuth()

const App = ({ Component, pageProps }: {Component: NextPage | any, pageProps: AppProps}) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App
