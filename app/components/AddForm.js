"use client";

import { useState, useEffect } from "react";
import recipeTypeData from "../data/recipeTypes.json";

export default function MakeRecipe() {
    const [error, setError] = useState('');

    return (
        <main>
            <h1>Make a Recipe</h1>
            <div>
                <h3>Choose Recipe Type</h3>
                {/* Dropdown for primary from recipeType */}
                <select>
                    <option value="">Select a Recipe Type</option>
                    {recipeTypeData.primary.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {/* Dropdown for secondary from recipeType */}
                <select>
                    <option value="">Select a Meal Type</option>
                    {recipeTypeData.secondary.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {/* Place to enter tags */}
                {/* Text input for recipe name */}
                {/* Text input for description */}
                {/* Place to enter ingredients with corresponding amounts */}
                {/* Check for keywords to determine allergens */}
                {/* Text input for instructions */}
                {/* Determine publish date from system time */}
            </div>
            <button type="submit">Submit</button>
            {error && <p>{error}</p>}
        </main>
    );
}