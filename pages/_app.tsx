import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout"
import { DataProvider } from "../context/dataProvider";


const App = ({ Component, pageProps }: AppProps) => {

  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}

export default App
