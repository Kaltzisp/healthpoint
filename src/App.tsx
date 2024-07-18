import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Components/Menu";
import React from "react";

import AddBiometric from "./Components/AddBiometric";
import AddCalories from "./Components/AddCalories";
import AddExercise from "./Components/AddExercise";
import ShowGraphs from "./Components/ShowGraphs";

function App(): React.JSX.Element {
    return (
        <BrowserRouter>
            <main>
                <Routes>
                    <Route element={<ShowGraphs />} path="/" />
                    <Route element={<AddBiometric />} path="/add-biometric" />
                    <Route element={<AddCalories />} path="/add-calories" />
                    <Route element={<AddExercise />} path="/add-exercise" />
                </Routes>
            </main>
            <Menu />
        </BrowserRouter>
    );
}

export default App;
