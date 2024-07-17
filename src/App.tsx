import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import React from "react";

import AddBiometric from "./Components/AddBiometric/AddBiometric";
import AddExercise from "./Components/AddExercise/AddExercise";
import ShowGraphs from "./Components/ShowGraphs/ShowGraphs";

function App(): React.JSX.Element {
    return (
        <BrowserRouter>
            <main>
                <Routes>
                    <Route element={<ShowGraphs />} path="/" />
                    <Route element={<AddBiometric />} path="/add-biometric" />
                    <Route element={<AddExercise />} path="/add-exercise" />
                </Routes>
            </main>
            <Menu />
        </BrowserRouter>
    );
}

export default App;
