import Image from "next/image"
import { signOut } from "../utils/firebase/firebase-auth"
import firebase from "firebase/compat/app";

interface AvatarProps{
  src?: string,
  alt?: string,
  name?: string,
  email?: string
  user: firebase.User | null
}

const Avatar = ({src, alt, name, email, user}: AvatarProps): JSX.Element => {
  console.log(user)
  return (
    <div className="flex items-center space-x-4">
      <Image 
        className="rounded-full" 
        src={src ? src : "/avatar.svg"}
        alt={alt}
        width={45} 
        height={45}/>
      <div className="space-y-1 font-medium dark:text-white">
          <button onClick={signOut}><div>{user?.displayName || "Tomas"}</div></button>
          <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
      </div>
    </div>
  )
}

export default Avatar