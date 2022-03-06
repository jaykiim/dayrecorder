import { gql } from 'graphql-request'
import { graphcmsClient } from '../lib/graphcms'

export const GetTodos = gql`
  query GetTodos($date: Date!, $email: String!) {
    todos: todos(where: { date: $date, user: { email: $email } }) {
      title
      id
      date
      done
      color
    }
  }
`

export const getTodos = async (date, email) => {
  try {
    const { todos } = await graphcmsClient.request(GetTodos, { date, email })
    return todos
  } catch (err) {
    console.log(err)
  }
}

export const CreateTodo = gql`
  mutation CreateTodo(
    $title: String!
    $color: Json!
    $done: Boolean!
    $date: Date!
    $email: String!
  ) {
    newTodo: createTodo(
      data: {
        title: $title
        color: $color
        done: $done
        date: $date
        user: { connect: { email: $email } }
      }
    ) {
      title
      date
      done
      id
      color
    }
  }
`

export const createTodoReq = async (values) => {
  try {
    const { newTodo } = await graphcmsClient.request(CreateTodo, values)
    return newTodo
  } catch (err) {
    console.log(err)
  }
}
