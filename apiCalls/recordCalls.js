import { gql } from 'graphql-request'
import { basicRequest } from './index'

const getRecords = gql`
  query getRecords($date: Date!, $email: String!) {
    records(where: { date: $date, user: { email: $email } }) {
      userCategory {
        categoryName
        id
      }
      userColor {
        color {
          hex
        }
        id
        tag
        userCategory {
          id
          categoryName
        }
      }
      id
      start
      end
      title
      date
      memo
    }
  }
`

const getRecordsBetween = gql`
  query getRecordsBetween($email: String!, $firstday: Date!, $lastday: Date!) {
    records(
      where: {
        user: { email: $email }
        date_gte: $firstday
        date_lte: $lastday
      }
    ) {
      userCategory {
        categoryName
        id
      }
      userColor {
        color {
          hex
        }
        id
        tag
        userCategory {
          id
          categoryName
        }
      }
      id
      start
      end
      title
      date
      memo
    }
  }
`

const updateRecord = gql`
  mutation updateRecord(
    $date: Date!
    $end: String!
    $start: String!
    $memo: String
    $title: String
    $email: String!
    $colorId: ID!
    $categoryId: ID!
    $recordId: ID!
  ) {
    updatedRecord: updateRecord(
      data: {
        date: $date
        end: $end
        start: $start
        memo: $memo
        title: $title
        user: { connect: { email: $email } }
        userColor: { connect: { id: $colorId } }
        userCategory: { connect: { id: $categoryId } }
      }
      where: { id: $recordId }
    ) {
      id
      memo
      date
      end
      start
      title
      userColor {
        id
        tag
        color {
          hex
        }
        userCategory {
          id
          categoryName
        }
      }
      userCategory {
        id
        categoryName
        userColors {
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

const createRecord = gql`
  mutation createRecord(
    $date: Date!
    $end: String!
    $start: String!
    $memo: String
    $title: String
    $email: String!
    $colorId: ID
    $categoryId: ID
  ) {
    createdRecord: createRecord(
      data: {
        date: $date
        end: $end
        start: $start
        memo: $memo
        title: $title
        user: { connect: { email: $email } }
        userColor: { connect: { id: $colorId } }
        userCategory: { connect: { id: $categoryId } }
      }
    ) {
      id
      memo
      date
      end
      start
      title
      userColor {
        id
        tag
        color {
          hex
        }
        userCategory {
          id
          categoryName
        }
      }
      userCategory {
        id
        categoryName
        userColors {
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

const deleteRecord = gql`
  mutation deleteRecord($id: ID!) {
    deleteRecord(where: { id: $id }) {
      id
    }
  }
`

const getRecordsReq = (values) => basicRequest(getRecords, values)
const getRecordsBetweenReq = (values) => basicRequest(getRecordsBetween, values)
const updateRecordReq = (values) => basicRequest(updateRecord, values)
const createRecordReq = (values) => basicRequest(createRecord, values)
const deleteRecordReq = (values) => basicRequest(deleteRecord, values)

export default {
  getRecordsReq,
  getRecordsBetweenReq,
  updateRecordReq,
  createRecordReq,
  deleteRecordReq,
}
