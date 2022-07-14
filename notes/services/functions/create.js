import * as uuid from "uuid";
import dynamoDb from "../util/dynamodb";
import handler from "../util/handler";


export const main = handler(async (event) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            userId : event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            noteId : uuid.v1(),
            content: data.content,
            attachment : data.attachment,
            createAt : Date.now(),
        },
    };

    await dynamoDb.put(params);
    return params.Item;

} )

