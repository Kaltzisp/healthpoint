import { type Datum, retrieveData } from "../services/api";
import React, { useState } from "react";

function ShowGraphs(): React.JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [items, setItems] = useState<Datum[]>([]);

    function renderData(data: Datum[]): React.JSX.Element {
        return (
            <ul>
                {
                    data.map(item => 
                        <li key={item.key}>{`${item.date}\t${item.dataType}\t${item.value}`}</li>
                    )
                }
            </ul>
        );
    }

    return (
        <div id="exercise-list">
            {items.length > 0 ? 
                renderData(items)
                : (((): void => {
                    retrieveData().then((data) => {
                        setItems(data);
                    }).catch(e => console.error(e));
                })(), <p>{"Loading..."}</p>)}
        </div>
    );
}

export default ShowGraphs;
