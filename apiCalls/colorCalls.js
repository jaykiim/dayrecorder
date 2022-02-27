import { gql } from 'graphql-request'
import { graphcmsClient } from '../lib/graphcms'

export const UpdateUserColor = gql`
  mutation UpdateUserColor($email: String!, $colorSet: Json!) {
    updateDayrecorderUser(
      data: { colors: $colorSet }
      where: { email: $email }
    ) {
      colors
    }
  }
`

export const updateUserColorReq = async (email, colorSet) => {
  try {
    await graphcmsClient.request(UpdateUserColor, {
      email,
      colorSet,
    })
  } catch (err) {
    console.log(err)
  }
}
