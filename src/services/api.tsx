export interface Datum {
    key: string | undefined;
    dataType: "exercise";
    date: string;
    biometric: string | undefined;
    exerciseType: string | undefined;
    exercise: string | undefined;
    value: string;
}

interface Payload {
    Item: {
        [attr: string]: {
            S: string;
        } | undefined;
    };
    TableName: string;
}

async function retrieveData(): Promise<Response> {
    return fetch("https://f35qe75lqe.execute-api.ap-southeast-2.amazonaws.com/v1", {
        method: "GET"
    });
}

async function sendData(endpoint: string, data: Datum): Promise<Response> {
    const payload: Payload = {
        TableName: "HealthPoint_DB",
        Item: {}
    };
    for (const [key, entry] of Object.entries(data)) {
        payload.Item[key] = { S: entry as string };
    }
    console.log(payload);
    return fetch("https://f35qe75lqe.execute-api.ap-southeast-2.amazonaws.com/v1", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

async function storeExercise(data: Datum): Promise<Response> {
    data.key = `${data.date}:${data.dataType}:${data.exerciseType}:${data.exercise}`;
    return sendData("exercises/add-exercise", data);
}

export { retrieveData, storeExercise };
