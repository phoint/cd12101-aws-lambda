import { deleteTodo } from '../../service/todoService.js'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('deleteTodo')

export async function handler(event) {
  const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by id
  logger.info(`Process event: ${event}`)
  const userId = getUserId(event)

  await deleteTodo(userId, todoId)
    .then(data => logger.info("DeleteItem succeeded!"))
    .catch(error => logger.error("Unable to DeleteItemCommand. Error: ", JSON.stringify(error, null, 2)))

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }
}

