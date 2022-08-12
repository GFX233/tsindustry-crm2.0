interface MessageProps{
    success?: boolean,
    alert?: boolean,
    text: string
  }

const Message = ({success, alert, text}: MessageProps): JSX.Element => {
    if (success) {
        return (
            <div className="absolute top-4 right-4 p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800">
                <div className="flex flex-row gap-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="font-medium">Úspěch!</span><span>{text}</span>
                </div>
            </div>
        )
    } else if (alert) {
        return (
            <div className="absolute top-4 right-4 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-green-200 dark:text-green-800">
                <div className="flex flex-row gap-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="font-medium">Něco se pokazilo!</span><span>{text}</span>
                </div>
            </div>
        )
    }
    return <></>
}

export default Message