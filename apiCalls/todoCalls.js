import { gql } from 'graphql-request'
import { graphcmsClient } from '../lib/graphcms'

export const CreateTodo = gql`
  mutation CreateTodo(
    $title: String!
    $color: Json!
    $done: Boolean!
    $date: Date!
    $email: String!
  ) {
    createTodo(
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
    }
  }
`

export const createTodoReq = async (values) => {
  try {
    await graphcmsClient.request(CreateTodo, values)
  } catch (err) {
    console.log(err)
  }
}
