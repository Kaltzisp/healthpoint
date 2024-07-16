// MenuBar.js
import "./Menu.css";
import React from "react";

interface MenuProps {
    readonly onMenuClick: (view: "calories" | "exercise" | "weight") => void;
}

function Menu({ onMenuClick }: MenuProps): React.JSX.Element {

    return (
        <nav className="menu-bar">
            <a href="#graphs">{"Graphs"}</a>
            <a href="#weight">{"+Weight"}</a>
            <a href="#calories">{"+Calories"}</a>
            <a href="#exercise" onClick={() => {onMenuClick("exercise")}}>{"+Exercise"}</a>
        </nav>
    );

}

export default Menu;
