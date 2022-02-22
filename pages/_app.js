import '../styles/globals.scss'
import { SessionProvider, useSession } from 'next-auth/react'
import Topbar from '../components/menu/Topbar'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Topbar />
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

export default MyApp

function Auth({ children }) {
  const { data: session, status } = useSession({
    required: true,
    // onUnauthenticated() {
    //   Router.push('/landing')
    // },
  })
  const isUser = !!session?.user

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}
