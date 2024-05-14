import { getTodos } from '../../service/todoService.js'
import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'

const logger = createLogger('getToDos')

export async function handler(event) {
  // TODO: Get all TODO items for a current user
  logger.info(`Process event: ${event}`)
  const userId = getUserId(event)
  
  logger.info(`Getting todo for user ${userId}`)
  const result = await getTodos(userId)
    .then(result => {
      logger.info(`GetTodos succeeded. ${result.$metadata}`)
      return result
    })
    .catch(error => logger.error(`Unable to get Todo items. Error: ${error}`))
  const items = result.Items
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items
    })
  }
}
