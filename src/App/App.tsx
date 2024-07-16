import "./App.css";
import React, { useState } from "react";
import AddExercise from "../Components/AddExercise/AddExercise";
import Menu from "../Components/Menu/Menu";
import ShowGraphs from "../Components/ShowGraphs/ShowGraphs";

type View = "calories" | "exercise" | "graphs" | "weight";

function App(): React.JSX.Element {
    const [currentView, setCurrentView] = useState<View>("graphs");

    function handleMenuClick(view: View): void {
        setCurrentView(view);
    }

    function renderContent(): React.JSX.Element {
        switch (currentView) {
            case "exercise":
                return <AddExercise />;
            // case "calories":
            //     return <AddCalories />;
            // case "weight":
            //     return <AddWeight />;
            case "graphs":
                return <ShowGraphs />;
            default:
                return <ShowGraphs />;
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                {renderContent()}
            </header>
            <Menu onMenuClick={handleMenuClick} />
        </div>
    );
}

export default App;
