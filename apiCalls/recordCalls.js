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

export const UpdateRecord = gql`
  mutation UpdateRecord(
    $start: String!
    $end: String!
    $color: Json!
    $date: Date!
    $title: String
    $memo: String
    $id: ID!
  ) {
    updateRecord(
      data: {
        color: $color
        date: $date
        end: $end
        memo: $memo
        start: $start
        title: $title
      }
      where: { id: $id }
    ) {
      color
    }
  }
`
export const updateRecordReq = async (values) => {
  try {
    await graphcmsClient.request(UpdateRecord, values)
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

export const CreateRecord = gql`
  mutation CreateRecord(
    $start: String!
    $end: String!
    $date: Date!
    $email: String!
    $color: Json!
    $title: String
    $memo: String
  ) {
    createRecord(
      data: {
        start: $start
        end: $end
        color: $color
        date: $date
        memo: $memo
        title: $title
        user: { connect: { email: $email } }
      }
    ) {
      color
      date
      end
      id
      memo
      start
      title
    }
  }
`

export const createRecordReq = async (values) => {
  try {
    const { createRecord } = await graphcmsClient.request(CreateRecord, values)
    return createRecord
  } catch (err) {
    console.log(err)
  }
}
