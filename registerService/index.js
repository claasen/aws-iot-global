const AWS = require('aws-sdk');
const iot = new AWS.Iot();
const db = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4');

module.exports.register = async (event, context) => {
    const certParams = { setAsActive: true };
    const data = await iot.createKeysAndCertificate(certParams).promise();
    const cert = data.certificatePem;
    const privateKey = data.keyPair.PrivateKey;
    const region = context.invokedFunctionArn.split(':')[3];
    const mqttEndpoint = `a24gfxst30900k-ats.iot.${region}.amazonaws.com`;
    const id = uuidv4();
    const dbParams = {
        TableName: 'thing-table',
        Item: { id, region }
    };
    await db.put(dbParams).promise();
    return {
        statusCode: 201,
        body: JSON.stringify({ id, region, cert, privateKey, mqttEndpoint })
    }
};
