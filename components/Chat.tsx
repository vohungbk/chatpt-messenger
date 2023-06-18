'use client'

import { db } from '@/firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'

type Props = {
  chatId: string
}

function Chat({ chatId }: Props) {
  const { data: session } = useSession()
  const messageEl = useRef<any>(null)

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session.user?.email!,
          'chats',
          chatId,
          'messages'
        ),
        orderBy('createdAt', 'asc')
      )
  )

  useEffect(() => {
    if (messageEl && messageEl.current) {
      messageEl?.current.addEventListener('DOMNodeInserted', (event: any) => {
        const { currentTarget: target } = event
        target?.scroll({ top: target.scrollHeight, behavior: 'smooth' })
      })
    }
  }, [])

  return (
    <div className="flex-1 overflow-y-auto" ref={messageEl}>
      {messages?.empty && (
        <div>
          <p className="pt-10 text-center text-white">
            Type a prompt below to start
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </div>
      )}
      {messages?.docs?.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  )
}

export default Chat
