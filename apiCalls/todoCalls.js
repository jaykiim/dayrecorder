import { gql } from 'graphql-request'
import { graphcmsClient } from '../lib/graphcms'

const getTodos = gql`
  query getTodos($email: String!, $firstday: Date!, $lastday: Date!) {
    todos(
      where: {
        user: { email: $email }
        date_gte: $firstday
        date_lte: $lastday
      }
    ) {
      date
      done
      id
      title
      userColor {
        color {
          hex
        }
        id
        tag
        userCategory {
          categoryName
          id
        }
      }
    }
  }
`

const updateTodo = gql`
  mutation updateTodo($title: String!, $colorId: ID!, $todoId: ID!) {
    updatedTodo: updateTodo(
      data: { title: $title, userColor: { connect: { id: $colorId } } }
      where: { id: $todoId }
    ) {
      id
      done
      date
      title
      userColor {
        color {
          hex
        }
        id
        tag
        userCategory {
          categoryName
          id
        }
      }
    }
  }
`

const basicRequest = async (query, values) => {
  try {
    const response = await graphcmsClient.request(query, values)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getTodosReq = (values) => basicRequest(getTodos, values)
export const updateTodoReq = (values) => basicRequest(updateTodo, values)
