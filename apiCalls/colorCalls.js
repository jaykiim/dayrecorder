import { gql } from 'graphql-request'
import { graphcmsClient } from '../lib/graphcms'

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

export const updateUserCategoryName = gql`
  mutation updateUserCategoryName($categoryName: String!, $id: ID!) {
    updatedUserCategory: updateUserCategory(
      data: { categoryName: $categoryName }
      where: { id: $id }
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

export const updateUserCategoryNameReq = async (categoryName, id) => {
  try {
    const updatedUserCategory = await graphcmsClient.request(
      updateUserCategoryName,
      { categoryName, id }
    )
    return updatedUserCategory
  } catch (err) {
    console.log(err)
  }
}

export const deleteUserCategory = gql`
  mutation deleteUserCategory($id: ID!) {
    deleteUserCategory(where: { id: $id }) {
      id
      categoryName
    }
  }
`

export const deleteUserCategoryReq = async (id) => {
  try {
    await graphcmsClient.request(deleteUserCategory, { id })
  } catch (err) {
    console.log(err)
  }
}

export const createUserColor = gql`
  mutation createUserColor(
    $hex: Hex!
    $tag: String!
    $email: String!
    $categoryId: ID!
  ) {
    updatedCategory: createUserColor(
      data: {
        color: { hex: $hex }
        tag: $tag
        dayrecorderUser: { connect: { email: $email } }
        userCategory: { connect: { id: $categoryId } }
      }
    ) {
      userCategory {
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
  }
`

export const createUserColorReq = async (values) => {
  try {
    const { updatedCategory } = await graphcmsClient.request(
      createUserColor,
      values
    )
    return updatedCategory
  } catch (err) {
    console.log(err)
  }
}

export const updateUserColor = gql`
  mutation updateUserColor($hex: Hex!, $tag: String!, $id: ID!) {
    updatedCategory: updateUserColor(
      data: { color: { hex: $hex }, tag: $tag }
      where: { id: $id }
    ) {
      userCategory {
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
  }
`

export const updateUserColorReq = async (values) => {
  try {
    const { updatedCategory } = await graphcmsClient.request(
      updateUserColor,
      values
    )
    return updatedCategory
  } catch (err) {
    console.log(err)
  }
}

export const deleteUserColor = gql`
  mutation deleteUserColor($id: ID!) {
    updatedCategory: deleteUserColor(where: { id: $id }) {
      userCategory {
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
  }
`
export const deleteUserColorReq = async (id) => {
  try {
    const { updatedCategory } = await graphcmsClient.request(deleteUserColor, {
      id,
    })
    return updatedCategory
  } catch (err) {
    console.log(err)
  }
}
