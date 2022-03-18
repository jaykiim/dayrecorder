import { gql } from 'graphql-request'
import { graphcmsClient } from '../lib/graphcms'

export const getRecords = gql`
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

export const getRecordsReq = async (date, email) => {
  try {
    const { records } = await graphcmsClient.request(getRecords, {
      date,
      email,
    })

    return records
  } catch (err) {
    console.log(err)
  }
}

export const updateRecord = gql`
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

export const updateRecordReq = async (values) => {
  try {
    const { updatedRecord } = await graphcmsClient.request(updateRecord, values)
    return updatedRecord
  } catch (err) {
    console.log(err)
  }
}

export const createRecord = gql`
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

export const createRecordReq = async (values) => {
  try {
    const { createdRecord } = await graphcmsClient.request(createRecord, values)
    return createdRecord
  } catch (err) {
    console.log(err)
  }
}

export const GetWeeklyRecords = gql`
  query GetWeeklyRecords($email: String!, $firstday: Date!, $lastday: Date!) {
    weeklyRecords: dayrecorderUser(where: { email: $email }) {
      record(
        where: { date_gte: $firstday, date_lte: $lastday }
        orderBy: date_ASC
      ) {
        id
        date
        start
        end
        color
        title
        memo
      }
    }
  }
`

export const getWeeklyRecordsReq = async (email, firstday, lastday) => {
  try {
    const { weeklyRecords } = await graphcmsClient.request(GetWeeklyRecords, {
      email,
      firstday,
      lastday,
    })
    return weeklyRecords.record
  } catch (err) {
    console.log(err)
  }
}

export const DeleteRecord = gql`
  mutation DeleteRecord($id: ID!) {
    deleteRecord(where: { id: $id }) {
      id
    }
  }
`

export const deleteRecordReq = async (id) => {
  try {
    await graphcmsClient.request(DeleteRecord, { id })
  } catch (err) {
    console.log(err)
  }
}
