export { default as authCalls } from './authCalls'
export { default as colorCalls } from './colorCalls'
export { default as recordCalls } from './recordCalls'
export { default as todoCalls } from './todoCalls'

import { graphcmsClient } from '../lib/graphcms'
export const basicRequest = async (query, values) => {
  try {
    const response = await graphcmsClient.request(query, values)
    return response
  } catch (err) {
    console.log(err)
  }
}
