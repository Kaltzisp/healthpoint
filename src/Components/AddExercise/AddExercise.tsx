import "./AddExercise.css";
import React, { useState } from "react";

function AddExercise(): React.JSX.Element {
    const [exerciseData, setExerciseData] = useState({
        date: new Date().toISOString().split("T")[0],
        type: "cardio",
        exercise: "5km",
        time: ""
    });

    function updateExercise(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const { name, value } = event.target;
        setExerciseData({ ...exerciseData, [name]: value });
    }

    function saveExercise(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { date, type, exercise, time } = exerciseData;
        localStorage.setItem(`${date}:${type}:${exercise}`, time);
        console.log(`${date}:${type}:${exercise}`, time);
    }

    return (
        <form onSubmit={saveExercise}>
            <label>
                {"Date"}
                <input defaultValue={exerciseData.date} name="date" onChange={updateExercise} type="date" />
            </label>
            <label>
                {"Type"}
                <select defaultValue={exerciseData.type} name="type" onChange={updateExercise}>
                    <option value="cardio">{"Cardio"}</option>
                    <option value="strength">{"Strength"}</option>
                    <option value="flexibility">{"Flexibility"}</option>
                </select>
            </label>
            <label>
                {"Exercise"}
                <select defaultValue={exerciseData.exercise} name="exercise" onChange={updateExercise}>
                    { exerciseData.type === "cardio" && <option value="1km">{"1 km"}</option>}
                    { exerciseData.type === "cardio" && <option value="5km">{"5 km"}</option>}
                    { exerciseData.type === "cardio" && <option value="10km">{"10 km"}</option>}
                </select>
            </label>
            <label>
                {"Time"}
                <input defaultValue={exerciseData.time} inputMode="decimal" name="time" onChange={updateExercise} type="decimal" />
            </label>
            <button type="submit">{"Submit"}</button>
        </form>
    );
}

export default AddExercise;
