import "./AddExercise.css";
import React, { useState } from "react";

function AddExercise(): React.JSX.Element {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [exerciseType, setExerciseType] = useState("cardio");
    const [exercise, setExercise] = useState("5km");
    const [time, setTime] = useState("");


    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        localStorage.setItem(`${date}:${exerciseType}:${exercise}`, time);
        console.log(`${date}:${exerciseType}:${exercise}`, time);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                {"Date"}
                <input onChange={(e): void => setDate(e.target.value)} type="date" value={date} />
            </label>
            <label>
                {"Type"}
                <select defaultValue={exerciseType} onChange={(e): void => {
                    setExerciseType(e.target.value);
                    if (e.target.value !== "cardio") {
                        setExercise("");
                    }
                }}>
                    <option value="cardio">{"Cardio"}</option>
                    <option value="strength">{"Strength"}</option>
                    <option value="flexibility">{"Flexibility"}</option>
                </select>
            </label>
            <label>
                {"Exercise"}
                <select defaultValue={exercise} onChange={(e): void => setExercise(e.target.value)}>
                    { exerciseType === "cardio" && <option value="1km">{"1 km"}</option>}
                    { exerciseType === "cardio" && <option value="5km">{"5 km"}</option>}
                    { exerciseType === "cardio" && <option value="10km">{"10 km"}</option>}
                </select>
            </label>
            <label>
                {"Time"}
                <input defaultValue={time} inputMode="decimal" onChange={(e): void => setTime(e.target.value)} type="decimal" />
            </label>
            <button type="submit">{"Submit"}</button>
        </form>
    );
}

export default AddExercise;
