import { v4 as uuidv4 } from 'uuid'
import { updateAttachmentUrl, getUploadUrl} from '../../service/todoService.js'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs'


const logger = createLogger('generateUploadUrl')

export async function handler(event) {
  const todoId = event.pathParameters.todoId

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  const imgId = uuidv4()
  const userId = getUserId(event)

  const uploadUrl = await updateAttachmentUrl(userId, todoId, imgId)
    .then(result => {
      logger.info(`Getting presigned url`)
      return getUploadUrl(imgId)
    })
    .then(url => {
      logger.info(`Presigned url: ${url}`)
      return JSON.stringify({uploadUrl: url})
    })
    .catch(error => logger.error(`Unable to generate presigned url. Error: ${error}`))
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: uploadUrl
  }
}

