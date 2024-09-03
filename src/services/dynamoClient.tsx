export interface Event {
    [key: string]: string | undefined;
}

interface Item {
    [key: string]: {
        S: string;
    };
}

interface DynamoTable {
    Items: Item[];
}

// Transforms an object into a DynamoDB item.
function createDynamoItem(event: Event): Item {
    const item: Item = {};
    for (const [key, value] of Object.entries(event)) {
        item[key] = { S: value! };
    }
    return item;
}

// Transforms a DynamoDB table into an object.
function parseDynamoTable(table: DynamoTable): Event[] {
    return table.Items.map(item => Object.keys(item).reduce((event: Event, key: string) => {
        event[key] = item[key].S;
        return event;
    }, {}));
}

// Makes a request to DynamoDB using the API Gateway.
async function makeDynamoRequest(method: "GET" | "PUT", tableName: string, event?: Event): Promise<Response> {
    const response = await fetch("https://f35qe75lqe.execute-api.ap-southeast-2.amazonaws.com/v2/", {
        method: "PUT",
        body: JSON.stringify(event ? {
            TableName: tableName,
            Item: createDynamoItem(event)
        } : {
            TableName: tableName
        })
    });
    return response;
}

export const dynamoClient = {
    get: async (tableName: string): Promise<Event[]> => {
        const response = await makeDynamoRequest("GET", tableName);
        const dynamoTable = await response.json() as DynamoTable;
        return parseDynamoTable(dynamoTable);
    },
    put: async (tableName: string, event: Event): Promise<Response> => {
        event.key = `${event.date!}:${event.type!}`;
        return makeDynamoRequest("PUT", tableName, event);
    }
};
