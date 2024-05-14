import { createTodo } from '../../service/todoService.js'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs'
import { v4 as uuidv4 } from 'uuid'

const logger = createLogger('createTodo')

export async function handler(event) {
  const newTodo = JSON.parse(event.body)

  // TODO: Implement creating a new TODO item
  logger.info(`Processing event: ${event}`)
  const userId = getUserId(event)
  const todoId = uuidv4()
    const createdTodo = {
        userId,
        todoId,
        createdAt: new Date().toISOString(),
        done: false,
        attachmentUrl: '',
        ...newTodo
    }

  await createTodo(createdTodo)
    .then(result => logger.info(`CreateTodo Succeeded. ${result.$metadata}`))
    .catch(error => logger.error(`Unable to create new Todo. Error: ${error}`))

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: createdTodo
    })
  }
}

