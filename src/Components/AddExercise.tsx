import { type Datum, storeExercise } from "../services/api";
import React, { useState } from "react";

function AddExercise(): React.JSX.Element {
    const [exerciseData, setExerciseData] = useState({
        date: new Date().toISOString().split("T")[0],
        dataType: "exercise",
        exerciseType: "cardio",
        exercise: "5km",
        value: ""
    } as Datum);

    function updateExercise(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        setExerciseData({ ...exerciseData, [event.target.name]: event.target.value });
    }

    function saveExercise(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        storeExercise(exerciseData).then((res) => {
            console.log(
                `API Response: ${res.status} for data:`,
                `${exerciseData.date}:${exerciseData.exerciseType}:${exerciseData.exercise}:${exerciseData.value}`
            );
        }).catch(e => console.error(e));
    }

    return (
        <form onSubmit={saveExercise}>
            <label>
                {"Date"}
                <input defaultValue={exerciseData.date} name="date" onChange={updateExercise} type="date" />
            </label>
            <label>
                {"Type"}
                <select defaultValue={exerciseData.exerciseType} name="exerciseType" onChange={updateExercise}>
                    <option value="cardio">{"Cardio"}</option>
                    <option value="strength">{"Strength"}</option>
                    <option value="flexibility">{"Flexibility"}</option>
                </select>
            </label>
            <label>
                {"Exercise"}
                <select defaultValue={exerciseData.exercise} name="exercise" onChange={updateExercise}>
                    { exerciseData.exerciseType === "cardio" && <option value="1km">{"1 km"}</option>}
                    { exerciseData.exerciseType === "cardio" && <option value="5km">{"5 km"}</option>}
                    { exerciseData.exerciseType === "cardio" && <option value="10km">{"10 km"}</option>}
                </select>
            </label>
            <label>
                {"Value"}
                <input defaultValue={exerciseData.value} inputMode="decimal" name="value" onChange={updateExercise} type="decimal" />
            </label>
            <button type="submit">{"Submit"}</button>
        </form>
    );
}

export default AddExercise;
