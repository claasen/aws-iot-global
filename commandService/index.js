const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

module.exports.sendCommand = async (event) => {
    const dbParams = {
        TableName: 'thing-table',
        Key: {
            id: event.pathParameters.id
        }
    };
    const dbResponse = await db.get(dbParams).promise();
    const mqttEndpoint = `a24gfxst30900k-ats.iot.${dbResponse.Item.region}.amazonaws.com`;
    const iotData = new AWS.IotData({ endpoint: mqttEndpoint });
    const mqttParams = { topic: `${event.pathParameters.id}/command/${event.pathParameters.command}` };
    await iotData.publish(mqttParams).promise();
    return;
};
