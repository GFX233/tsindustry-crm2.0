import Image from "next/image"

interface AvatarProps{
  src?: string,
  alt?: string,
  name?: string,
  email?: string
}

const Avatar = ({src, alt, name, email}: AvatarProps): JSX.Element => {
  return (
    <div className="flex items-center space-x-4">
      <Image 
        className="rounded-full" 
        src={src ? src : "/avatar.svg"}
        alt={alt}
        width={45} 
        height={45}/>
      <div className="space-y-1 font-medium dark:text-white">
          <div>{name ? name : "Tomáš Spáčil"}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{email ? email : "tomas.spacil@tsindustry.cz"}</div>
      </div>
    </div>
  )
}

export default Avatar