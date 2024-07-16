import "./ShowGraphs.css";
import React from "react";

function ShowGraphs(): React.JSX.Element {
    const exercises = [];
    for (const key of Object.keys(localStorage)) {
        exercises.push(`${key} = ${localStorage.getItem(key)}`);
    }

    return (
        <div id="exercise-list">{exercises.join("\n")}</div>
    );
}

export default ShowGraphs;
