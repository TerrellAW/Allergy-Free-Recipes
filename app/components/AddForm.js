"use client";

import { useState, useEffect } from "react";
import recipeTypeData from "../data/recipeTypes.json";

export default function MakeRecipe() {
    const [recipeTypes] = useState(recipeTypeData);
    const [recipeData, setRecipeData] = useState(null);
    const [milk, setMilk] = useState(false);
    const [eggs, setEggs] = useState(false);
    const [fish, setFish] = useState(false);
    const [shellfish, setShellfish] = useState(false);
    const [treeNuts, setTreeNuts] = useState(false);
    const [peanuts, setPeanuts] = useState(false);
    const [wheat, setWheat] = useState(false);
    const [soy, setSoy] = useState(false);
    const [gluten, setGluten] = useState(false);
    const [sugar, setSugar] = useState(false);
    const [error, setError] = useState('');

    return (
        <main>
            <h1>Make a Recipe</h1>
            <h3>Choose Recipe Type</h3>
            {/* Dropdown for primary from recipeType */}
            {/* Dropdown for secondary from recipeType */}
            {/* Side bar with place to enter tags */}
            {/* Text input for recipe name */}
            {/* Text input for description */}
            {/* Place to enter ingredients with corresponding amounts */}
            {/* Check for keywords to determine allergens */}
            {/* Text input for instructions */}
            {/* Determine publish date from system time */}
            {error && <p>{error}</p>}
        </main>
    );
}