import { updateTodo } from '../../service/todoService.js'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('updateTodo')

export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)
  
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  const userId = getUserId(event)
  await updateTodo(userId, todoId, updateTodo)
    .then(result => {
      logger.info(`Update Todo Succeeded. ${result.$metadata}`)
    })
    .catch(error => logger.error(`Unable to update Todo. Error ${error}`))

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }
}
