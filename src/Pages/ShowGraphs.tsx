import { type Datum, retrieveData } from "services/api";
import LineChart, { transformData } from "Components/LineChart";
import React, { useEffect, useState } from "react";

function ShowGraphs(): React.JSX.Element {
    const [items, setItems] = useState<Datum[]>([]);

    useEffect(() => {
        retrieveData().then((saveData) => {
            setItems(saveData);
        }).catch(e => console.error(e));
    }, []);

    return (
        <div id="graphs">
            <div className="canvas-container">
                { items.length > 0 ? 
                    <LineChart data={transformData(items, "exercise", "5km")} name="5km Run (mins)" />
                    : "Loading..."}
            </div>
            <div className="canvas-container">
                { items.length > 0 ? 
                    <LineChart data={transformData(items, "biometric", "weight")} name="Body Weight (kg)" />
                    : "Loading..."}
            </div>
        </div>
    );
}

export default ShowGraphs;
