import React from "react";
import { retrieveExercises } from "../services/api";

function ShowGraphs(): React.JSX.Element {
    const exercises = [];
    for (const key of Object.keys(localStorage)) {
        exercises.push(`${key} = ${localStorage.getItem(key)}`);
    }

    retrieveExercises().then((res) => {
        res.json().then((data) => {
            console.log(data);
        }).catch(e => console.log(e));
    }).catch(e => console.error(e));

    return (
        <div id="exercise-list">{exercises.join("\n")}</div>
    );
}

export default ShowGraphs;
