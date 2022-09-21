import { NextPage } from "next"
import Head from 'next/head'

const Planner: NextPage = () => {
  return (
<>
      <Head>
        <title>PLANNER: TS INDUSTRY SYSTEMS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-row mt-4 justify-center max-w-5xl mx-auto">
        <div className="shadow-xl sm:rounded-lg overflow-x-auto relative w-full">
        </div>
      </div>
    </>
  )
}

export default Planner