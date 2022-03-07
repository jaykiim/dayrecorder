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

export const GetUserCategories = gql`
  query GetUserCategories($email: String!) {
    userCategories: userCategories(
      where: { dayrecorderUser: { email: $email } }
    ) {
      categoryName
      id
      userColors {
        color {
          hex
        }
        id
        tag
      }
    }
  }
`

export const getUserCategoriesReq = async (email) => {
  try {
    const { userCategories } = await graphcmsClient.request(GetUserCategories, {
      email,
    })
    return userCategories
  } catch (err) {
    console.log(err)
  }
}

export const CreateUserCategory = gql`
  mutation CreateUserCategory($categoryName: String!, $email: String!) {
    createdCategory: createUserCategory(
      data: {
        categoryName: $categoryName
        dayrecorderUser: { connect: { email: $email } }
      }
    ) {
      id
      categoryName
      userColors {
        id
        color {
          hex
        }
        tag
      }
    }
  }
`

export const createUserCategoryReq = async (categoryName, email) => {
  try {
    const { createdCategory } = await graphcmsClient.request(
      CreateUserCategory,
      { categoryName, email }
    )
    return createdCategory
  } catch (err) {
    console.log(err)
  }
}
