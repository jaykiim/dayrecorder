import '../styles/globals.scss'
import { RecoilRoot } from 'recoil'
import { SessionProvider, useSession } from 'next-auth/react'
import LeftRemote from '../components/menu/RemoteMenu'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        {Component.auth ? (
          <Auth>
            <div className="h-screen w-screen md:flex md:p-5">
              <LeftRemote />
              <Component {...pageProps} />
            </div>
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </RecoilRoot>
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
