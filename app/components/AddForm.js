"use client";

import { useState, useEffect } from "react";
import recipeTypeData from "../data/recipeTypes.json";

export default function MakeRecipe() {
    const [formData, setFormData] = useState({
        recipeType: '',
        mealType: '',
        recipeName: '',
        description: '',
        ingredients: [{ name: '', quantity: '' }],
        instructions: '',
        publishDate: new Date().toISOString().split('T')[0],
        tags: [],
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index][field] = value;
        setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
    };

    const handleAddIngredient = () => {
        setFormData((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, { name: '', quantity: '' }],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('Not yet implemented.');
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-blue-50">
            <h1 className="text-3xl font-bold mb-6">Make a Recipe</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="recipeType" className="block text-sm font-medium mb-1">Recipe Type</label>
                    {/* Dropdown for primary from recipeType */}
                    <select
                        id="recipeType"
                        name="recipeType"
                        value={formData.recipeType}
                        onChange={handleChange}
                        className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                    >
                        <option value="">Select a Recipe Type</option>
                        {recipeTypeData.primary.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="mealType" className="block text-sm font-medium mb-1">Meal Type</label>
                    {/* Dropdown for secondary from recipeType */}
                    <select
                        id="mealType"
                        name="mealType"
                        value={formData.mealType}
                        onChange={handleChange}
                        className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                    >
                        <option value="">Select a Meal Type</option>
                        {recipeTypeData.secondary.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="recipeName" className="block text-sm font-medium mb-1">Recipe Name</label>
                <input
                    id="recipeName"
                    name="recipeName"
                    type="text"
                    value={formData.recipeName}
                    onChange={handleChange}
                    className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Ingredients</label>
                {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2">
                        <input
                            type="text"
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            placeholder="Ingredient"
                            className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                            required
                        />
                        <input
                            type="text"
                            value={ingredient.quantity}
                            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                            placeholder="Quantity"
                            className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                            required
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="text-blue-950 bg-blue-100 rounded-md p-2 px-4 mt-4"
                >
                    Add Ingredient
                </button>
            </div>
            <div>
                <label htmlFor="instructions" className="block text-sm font-medium mb-1">Instructions</label>
                <textarea
                    id="instructions"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    rows="6"
                    className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                    required
                />
            </div>
            <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
                <input
                    id="tags"
                    name="tags"
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value.split(', ').map((tag) => tag.trim()) }))}
                    className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                />
            </div>

            <button type="submit" className="text-blue-950 bg-blue-100 rounded-md p-2 px-4">Submit</button>
            
            {error && <p>{error}</p>}
        </form>
    );
}