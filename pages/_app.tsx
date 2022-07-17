import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout"
import initAuth from "../utils/initAuth"

initAuth()


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App
