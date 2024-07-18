export interface Datum {
    key: string | undefined;
    dataType: "biometric" | "exercise";
    date: string;
    biometric: string | undefined;
    exerciseType: string | undefined;
    exercise: string | undefined;
    value: string;
}

interface TransformedDatum {
    [key: string]: string | undefined;
}

interface Item {
    [attr: string]: {
        S: string;
    } | undefined;
}

interface Scan {
    Items: Item[];
}

interface Payload {
    Item: Item;
    TableName: string;
}

async function retrieveData(): Promise<Datum[]> {
    const res = await fetch("https://f35qe75lqe.execute-api.ap-southeast-2.amazonaws.com/v1", {
        method: "GET"
    });
    const scan = await res.json() as Scan;
    const items = scan.Items.map(item => Object.keys(item).reduce<TransformedDatum>((object, key: string) => {
        object[key] = item[key]?.S;
        return object;
    }, {}));
    return items as unknown as Datum[];
}

function sendData(data: Datum): void {
    switch (data.dataType) {
        case "exercise":
            data.key = `${data.date}:${data.dataType}:${data.exerciseType}:${data.exercise}`;
            break;
        case "biometric":
            data.key = `${data.date}:${data.dataType}:${data.biometric}`;
            break;
        default:
            data.key = `UNKNOWN-${Date.now()}`;
    }
    const payload: Payload = {
        TableName: "HealthPoint_DB",
        Item: {}
    };
    for (const [key, entry] of Object.entries(data)) {
        payload.Item[key] = { S: entry as string };
    }
    console.log(payload);
    fetch("https://f35qe75lqe.execute-api.ap-southeast-2.amazonaws.com/v1", {
        method: "POST",
        body: JSON.stringify(payload)
    }).then((res) => {
        console.log(`API Response ${res.status} for key: ${data.key}`);
    }).catch(e => console.error(e));
}

export { retrieveData, sendData };
