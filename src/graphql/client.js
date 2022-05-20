import { GraphQLClient } from 'graphql-request'

export const graphQLClient = new GraphQLClient(process.env.GRAPHQL_HOST, {
    headers: {
      "Authorization": `Bearer ${process.env.GRAPHQL_TOKEN}`
    }
})
