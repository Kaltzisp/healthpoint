import type { ExerciseData } from "../Components/AddExercise";

async function storeExercise(data: ExerciseData): Promise<Response> {
    return fetch("https://f35qe75lqe.execute-api.ap-southeast-2.amazonaws.com/deployment-stage/exercises/add-exercise", {
        method: "POST",
        body: JSON.stringify({
            TableName: "HealthPoint_DB",
            Item: {
                key: { S: `${data.date}:${data.type}:${data.exercise}` },
                date: { S: data.date },
                type: { S: data.type },
                exercise: { S: data.exercise },
                value: { S: data.value }
            }
        })
    });
}

async function retrieveExercises(): Promise<Response> {
    return fetch("https://f35qe75lqe.execute-api.ap-southeast-2.amazonaws.com/deployment-stage/exercises/get-exercises", {
        method: "POST",
        body: JSON.stringify({ TableName: "HealthPoint_DB" })
    });
}

export { storeExercise, retrieveExercises };
