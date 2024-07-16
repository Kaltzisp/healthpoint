// MenuBar.js
import "./Menu.css";
import React from "react";

interface MenuProps {
    readonly onMenuClick: (view: "calories" | "exercise" | "graphs" | "weight") => void;
}

function Menu({ onMenuClick }: MenuProps): React.JSX.Element {

    return (
        <nav className="menu-bar">
            <a href="#graphs" onClick={(): void => {
                onMenuClick("graphs");
            }}>{"Graphs"}
            </a>
            <a href="#weight">{"+Weight"}</a>
            <a href="#calories">{"+Calories"}</a>
            <a href="#exercise" onClick={(): void => {
                onMenuClick("exercise");
            }}>{"+Exercise"}
            </a>
        </nav>
    );

}

export default Menu;
