/* eslint-disable @next/next/no-img-element */
import { DocumentData } from 'firebase/firestore'
import React from 'react'

type Props = {
  message: DocumentData
}

function Message({ message }: Props) {
  const isChatGPT = message?.user?.name === 'ChatGPT'
  return (
    <div className={`text-white py-5 ${isChatGPT && 'bg-[#434654]'}`}>
      <div className="flex space-x-5 px-5 max-w-2xl mx-auto">
        <img src={message?.user?.avatar} alt="Avatar" className="h-8 w-8" />
        <p className="pt-1 text-sm">{message?.text}</p>
      </div>
    </div>
  )
}

export default Message
