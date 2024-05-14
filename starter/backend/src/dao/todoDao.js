import AWSXRay from 'aws-xray-sdk-core'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const dynamoDbXray = AWSXRay.captureAWSv3Client(new DynamoDB())
const dynamodbClient = DynamoDBDocument.from(dynamoDbXray)
const todoTable = process.env.TODOS_TABLE

export class TodoDao {

    async getItem(userId, todoId) {
        return await dynamodbClient.get({
            TableName: todoTable,
            Key: {
                userId,
                todoId
            }
        })
    }

    async getItems(userId) {
        return await dynamodbClient.query({
            TableName: todoTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        })
    }

    async createItem(todo) {
        return await dynamodbClient.put({
            TableName: todoTable,
            Item: todo
        })
    }

    async updateItem(userId, todoId, updatedTodo) {
        return await dynamodbClient.update({
            TableName: todoTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
            ExpressionAttributeNames: {
                "#name": "name"
            },
            ExpressionAttributeValues: {
                ":name": updatedTodo.name,
                ":dueDate": updatedTodo.dueDate,
                ":done": updatedTodo.done
            }
        })
    }

    async updateAttachmentUrl(userId, todoId, url) {
        return await dynamodbClient.update({
            TableName: todoTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
                ':attachmentUrl': url
            }
        })
    }

    async deleteItem(userId, todoId) {
        return await dynamodbClient.delete({
            TableName: todoTable,
            Key: {
                userId,
                todoId
            }
        })
    }
}