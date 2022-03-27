import { gql } from 'graphql-request'
import { basicRequest } from './index'

export const getAllCategories = gql`
  query getAllCategories($email: String!) {
    userCategories(where: { dayrecorderUser: { email: $email } }) {
      categoryName
      id
      records {
        start
        end
        id
        date
        userColor {
          id
          tag
          color {
            hex
          }
        }
      }
    }
  }
`

export const getUserCategory = gql`
  query getUserCategory($email: String!) {
    categories: userCategories(where: { dayrecorderUser: { email: $email } }) {
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

export const createUserCategory = gql`
  mutation createUserCategory($categoryName: String!, $email: String!) {
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

export const updateUserCategoryName = gql`
  mutation updateUserCategoryName($categoryName: String!, $id: ID!) {
    updatedCategory: updateUserCategory(
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

export const deleteUserCategory = gql`
  mutation deleteUserCategory($id: ID!) {
    deleteUserCategory(where: { id: $id }) {
      id
      categoryName
    }
  }
`

export const createUserColor = gql`
  mutation createUserColor(
    $hex: Hex!
    $tag: String!
    $email: String!
    $categoryId: ID!
  ) {
    createdUserColor: createUserColor(
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

export const updateUserColor = gql`
  mutation updateUserColor($hex: Hex!, $tag: String!, $id: ID!) {
    updatedUserColor: updateUserColor(
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

export const deleteUserColor = gql`
  mutation deleteUserColor($id: ID!) {
    deleteUserColor(where: { id: $id }) {
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

export const deleteManyUserColor = gql`
  mutation deleteManyUserColor($id: ID!) {
    deleteManyUserColors(where: { userCategory: { id: $id } }) {
      count
    }
  }
`

const getAllCategoriesReq = (values) => basicRequest(getAllCategories, values)
const getUserCategoryReq = (values) => basicRequest(getUserCategory, values)
const createUserCategoryReq = (values) =>
  basicRequest(createUserCategory, values)
const updateUserCategoryNameReq = (values) =>
  basicRequest(updateUserCategoryName, values)
const deleteUserCategoryReq = (values) =>
  basicRequest(deleteUserCategory, values)
const createUserColorReq = (values) => basicRequest(createUserColor, values)
const updateUserColorReq = (values) => basicRequest(updateUserColor, values)
const deleteUserColorReq = (values) => basicRequest(deleteUserColor, values)
const deleteManyUserColorReq = (values) =>
  basicRequest(deleteManyUserColor, values)

export default {
  getAllCategoriesReq,
  getUserCategoryReq,
  createUserCategoryReq,
  updateUserCategoryNameReq,
  deleteUserCategoryReq,
  createUserColorReq,
  updateUserColorReq,
  deleteUserColorReq,
  deleteManyUserColorReq,
}
