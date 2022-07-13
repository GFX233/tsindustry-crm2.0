import { NextPage } from "next"
import {withAuthUser} from 'next-firebase-auth'

const Orders: NextPage = () => {
  return (
    <div>
      <p>Orders</p>
    </div>
  )
}

export default withAuthUser(Orders)