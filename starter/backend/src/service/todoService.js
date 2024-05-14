import { TodoDao } from "../dao/todoDao.js";
import { createLogger } from "../utils/logger.mjs";
import {PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const logger = createLogger('service')
const todoDao = new TodoDao()
const bucketName = process.env.IMAGE_S3_BUCKET
const s3Client = new S3Client()


export async function getTodos(userId) {
    return await todoDao.getItems(userId)
}

export async function getTodo(userId, todoId) {
    return await todoDao.getItem(userId, todoId)
}

export async function createTodo(createdTodo) {
    return await todoDao.createItem(createdTodo)
}

export async function updateTodo(userId, todoId, updatedTodo) {
    return await todoDao.updateItem(userId, todoId, updatedTodo)
}

export async function updateAttachmentUrl(userId, todoId, imgId) {
    return await todoDao.getItem(userId, todoId).then(result => {
        if (result.Item) {
            const attachmentUrl = `http://${bucketName}.s3.amazonaws.com/${imgId}`
            return todoDao.updateAttachmentUrl(userId, todoId, attachmentUrl)
        } else {
            throw new Error(`Item ${todoId} Not Found`)
        }
    })
}

export async function getUploadUrl(imageId) {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: imageId
    })
    
    return await getSignedUrl(s3Client, command, {
      expiresIn: 300
    })
  }

export async function deleteTodo(userId, todoId) {
    return await todoDao.getItem(userId, todoId).then(result => {
        if (result.Item) {
            todoDao.deleteItem(userId, todoId)
        } else {
            throw new Error(`Item ${todoId} Not Found`)
        }
    })
}
