import React, { useState } from "react";

function AddBiometric(): React.JSX.Element {
    const [metricData, setMetricData] = useState({
        date: new Date().toISOString().split("T")[0],
        type: "weight",
        value: ""
    });

    function updateMetric(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const { name, value } = event.target;
        setMetricData({ ...metricData, [name]: value });
    }

    function saveExercise(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { date, type, value } = metricData;
        localStorage.setItem(`${date}:${type}`, value);
        console.log(`${date}:${type}`, value);
    }

    return (
        <form onSubmit={saveExercise}>
            <label>
                {"Date"}
                <input defaultValue={metricData.date} name="date" onChange={updateMetric} type="date" />
            </label>
            <label>
                {"Biometric"}
                <select defaultValue={metricData.type} name="type" onChange={updateMetric}>
                    <option value="weight">{"Body Weight"}</option>
                    <option value="resting-hr">{"Heart Rate (rest)"}</option>
                </select>
            </label>
            <label>
                {"Value"}
                <input defaultValue={metricData.value} inputMode="decimal" name="value" onChange={updateMetric} type="decimal" />
            </label>
            <button type="submit">{"Submit"}</button>
        </form>
    );
}

export default AddBiometric;
