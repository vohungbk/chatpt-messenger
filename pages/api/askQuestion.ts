import { adminDb } from '@/firebaseAdmin'
import query from '@/lib/queryApi'
import { serverTimestamp } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body
  if (!prompt) {
    res.status(400).json({ answer: 'Please provider a prompt' })
    return
  }
  if (!chatId) {
    res.status(400).json({ answer: 'Please provider a valid chat ID' })
    return
  }

  const response = await query(prompt, chatId, model)

  const message: Message = {
    text: response || 'ChatGPT was unable to find an answer for that',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: 'https://links.papareact.com/89k',
    },
  }

  console.log('message', message)

  await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

  res.status(200).json({ answer: message.text })
}
