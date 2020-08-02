const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

module.exports.getData = async (event) => {
    const dbParams = {
        TableName: 'data-table',
        Key: {
            id: event.pathParameters.id
        }
    };
    const response = await db.get(dbParams).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
};