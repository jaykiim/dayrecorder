import axios from 'axios'
import { gql } from 'graphql-request'
import { graphcmsClient } from '../lib/graphcms'
import { hash } from 'bcryptjs'

export const CreateUserByEmail = gql`
  mutation CreateUserByEmail(
    $username: String!
    $email: String!
    $password: String
  ) {
    newUser: createDayrecorderUser(
      data: { username: $username, email: $email, password: $password }
    ) {
      email
      username
    }
  }
`

export const createUserByEmailReq = async (credentials, userInfo) => {
  try {
    // 로컬 가입
    if (credentials) {
      const { username, email, password } = credentials
      const { newUser } = await graphcmsClient.request(CreateUserByEmail, {
        username,
        email,
        password: await hash(password, 12),
      })
      return newUser
    }

    // 소셜 가입
    else {
      const { username, email } = userInfo
      const { newUser } = await graphcmsClient.request(CreateUserByEmail, {
        username,
        email,
      })
      return newUser
    }
  } catch (err) {
    console.log(err)
  }
}

export const GetUserByEmail = gql`
  query getUserByEmail($email: String!) {
    user: dayrecorderUser(where: { email: $email }, stage: DRAFT) {
      email
      password
      username
      userCategory {
        id
        categoryName
        userColors {
          color {
            hex
          }
          id
          tag
        }
      }
    }
  }
`

export const getUserByEmailReq = async (email) => {
  try {
    const { user } = await graphcmsClient.request(GetUserByEmail, { email })
    return user
  } catch (err) {
    console.log(err)
  }
}

export const sendEmail = async (userEmail, setVerificationCode) => {
  const { data: verificationCode } = await axios.post(
    'api/auth/verificationMail',
    {
      mail: userEmail,
    }
  )
  setVerificationCode(verificationCode)
}
