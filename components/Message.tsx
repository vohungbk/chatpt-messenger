/* eslint-disable @next/next/no-img-element */
import { DocumentData } from 'firebase/firestore'
import React from 'react'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

type Props = {
  message: DocumentData
}

function Message({ message }: Props) {
  const isChatGPT = message?.user?.name === 'ChatGPT'

  const copy = async () => {
    await navigator.clipboard.writeText(message.text?.trim())
    toast.success('Text copied')
  }

  return (
    <div className={`text-white py-5 ${isChatGPT && 'bg-[#434654]'}`}>
      <div className="flex space-x-5 px-5 max-w-2xl mx-auto">
        <img src={message?.user?.avatar} alt="Avatar" className="h-8 w-8" />
        {message.text && (
          <p
            className="pt-1 text-sm"
            dangerouslySetInnerHTML={{
              __html: message.text,
            }}
          />
        )}
        {!!isChatGPT && (
          <DocumentDuplicateIcon
            onClick={copy}
            className="h-6 w-6 cursor-pointer ml-auto"
          />
        )}
      </div>
    </div>
  )
}

export default Message
