import { db } from '@/firebase'
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

type Props = {
  id: string
}

function ChatRow({ id }: Props) {
  const pathName = usePathname()
  const router = useRouter()
  const [active, setActive] = useState(false)
  const { data: session } = useSession()
  const [messages] = useCollection(
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
  )

  useEffect(() => {
    if (!pathName) return
    setActive(pathName.includes(id))
  }, [id, pathName])

  const removeChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
    router.replace('/')
  }

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[messages?.docs?.length - 1]?.data()?.text || 'New Chat'}
      </p>
      <TrashIcon
        onClick={() => removeChat()}
        className="h-5 w-5 text-grey-700 hover:text-red-700"
      />
    </Link>
  )
}

export default ChatRow
