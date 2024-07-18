import { type Datum, retrieveData } from "../services/api";
import React, { useEffect, useState } from "react";

function ShowGraphs(): React.JSX.Element {
    const [items, setItems] = useState<Datum[]>([]);

    useEffect(() => {
        retrieveData().then((saveData) => {
            setItems(saveData);
        }).catch(e => console.error(e));
    }, []);

    return (
        <div id="exercise-list">
            { items.length > 0 ? 
                <ul> {items.map(item => <li key={item.key}>{`${item.date}\t${item.dataType}\t${item.value}`}</li>)} </ul>
                : "Loading..."}
        </div>
    );
}

export default ShowGraphs;
