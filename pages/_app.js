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
  const { data: session } = useSession({
    required: true,
  })
  const isUser = !!session?.user

  if (isUser) {
    return children
  }

  return <div>Loading...</div>
}
