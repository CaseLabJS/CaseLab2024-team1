import { useMemo, useState } from 'react'
import { Session } from '@toolpad/core/AppProvider'

const demoSession: Session = {
  user: {
    name: 'Ivan Leonov',
    email: 'ivanleonov@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
}

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(demoSession)

  const authentication = useMemo(
    () => ({
      signIn: () => {
        setSession(demoSession)
        console.log('я вошел!')
      },
      signOut: () => {
        setSession(null)
        console.log('я вышел!')
      },
    }),
    []
  )

  return { session, authentication }
}
