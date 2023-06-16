/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import NewChat from './NewChat'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import ChatRow from './ChatRow'

function Sidebar() {
  const { data: session } = useSession()
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats'),
        orderBy('createdAt', 'asc')
      )
  )
  console.log(chats)

  return (
    <div className="flex flex-col p-2 h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
        </div>
        {chats?.docs.map((item) => (
          <ChatRow key={item.id} id={item.id} />
        ))}
      </div>

      {session && (
        <img
          src={session.user?.image!}
          alt=""
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
        />
      )}
    </div>
  )
}

export default Sidebar
