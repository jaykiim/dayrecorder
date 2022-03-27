import { gql } from 'graphql-request'
import { basicRequest } from './index'

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

const createTodo = gql`
  mutation createTodo(
    $title: String!
    $date: Date!
    $colorId: ID!
    $email: String!
  ) {
    newTodo: createTodo(
      data: {
        title: $title
        done: false
        date: $date
        userColor: { connect: { id: $colorId } }
        user: { connect: { email: $email } }
      }
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

const deleteTodo = gql`
  mutation deleteTodo($id: ID!) {
    todo: deleteTodo(where: { id: $id }) {
      id
    }
  }
`

const doneTodo = gql`
  mutation doneTodo($id: ID!) {
    updateTodo(data: { done: true }, where: { id: $id }) {
      id
    }
  }
`

const getTodosReq = (values) => basicRequest(getTodos, values)
const updateTodoReq = (values) => basicRequest(updateTodo, values)
const createTodoReq = (values) => basicRequest(createTodo, values)
const deleteTodoReq = (values) => basicRequest(deleteTodo, values)
const doneTodoReq = (values) => basicRequest(doneTodo, values)

export default {
  getTodosReq,
  updateTodoReq,
  createTodoReq,
  deleteTodoReq,
  doneTodoReq,
}
