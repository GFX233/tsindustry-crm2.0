import { NextPage } from "next"
import {withAuthUser} from 'next-firebase-auth'

const Orders: React.FC = () => {
  return (
    <div>
      <p>Orders</p>
    </div>
  )
}

export default withAuthUser()(Orders)