import { GraphQLClient } from 'graphql-request'

export const graphcmsClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
  }
)
