import { getServerSession } from 'next-auth/next'

import Sidebar from '@/components/Sidebar'
import './globals.css'
import { SessionProvider } from '@/components/SessionProvider'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Login from '@/components/Login'
import ClientProvider from '@/components/ClientProvider'

export const metadata = {
  title: 'ChatGPT Enhance',
  description:
    'ChatGPT Messenger is a chatbot messaging platform that allows users to have conversations with an AI-powered virtual assistant, ChatGPT.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-scroll md:min-w-[20rem]">
                <Sidebar />
              </div>
              <ClientProvider />
              <div className="bg-[#343541] flex-1">
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
