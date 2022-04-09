import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import {
  createUserByEmailReq,
  getUserByEmailReq,
} from '../../../apicalls/authCalls'

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // 사용자 세션 저장 방법 (database 또는 jwt를 선택할 수 있는데, CredentialsProvider를 사용하려면 jwt를 써야한다.)
    maxAge: 30 * 24 * 60 * 60, // 유효 기간 30일 (기본값)
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      authorize: async ({ email, password }) => {
        // 파라미터로 들어오는 값은 프론트 코드에서 signIn함수 두 번째 인자로 넘긴 객체

        const user = await getUserByEmailReq(email)

        if (!user) {
          throw new Error('이메일 혹은 비밀번호가 일치하지 않습니다.')
        }

        const isValid = await compare(password, user.password)

        if (!isValid) {
          throw new Error('이메일 혹은 비밀번호가 일치하지 않습니다.')
        }

        return {
          name: user.username,
          email,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_PWD,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        const { email } = session.user
        const user = await getUserByEmailReq(email) // DB에서 찾아서
        console.log('[...nextauth].js > callbacks > session', user)

        // 없으면 DB에 등록
        if (!user) {
          const userCategory = await createUserByEmailReq(null, session.user)
          session.user.categories = [userCategory]
        } else {
          // 소셜 로그인의 경우
          if (token.sub) {
            session.userId = token.sub
            session.social = true
          }

          session.user.categories = user.userCategory
          session.user.phone = user.phone
        }
      }

      return Promise.resolve(session)
    },
  },
})
