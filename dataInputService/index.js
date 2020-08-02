const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

module.exports.process = async (event) => {
    const records = event.Records.map(r => {
        JSON.parse(Buffer.from(String(r.kinesis.data), 'base64').toString('utf8'));
    });
    await Promise.all(records.map(async record => {
        const dbParams = {
            TableName: 'data-table',
            Item: {
                id: record.id, data: record.data
            }
        };
        await db.put(dbParams).promise();
    }));
    return;
};
