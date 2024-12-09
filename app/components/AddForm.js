"use client";

import { useState, useEffect } from "react";

import recipeTypeData from "../data/recipeTypes.json";

export default function MakeRecipe({ recipeData }) {
    const [data, setData] = useState(recipeData?.items || []);

    const [formData, setFormData] = useState({
        id: data.length + 1, // Might not work due to async nature of data
        type: { primary: '', secondary: '' },
        name: '',
        description: '',
        ingredients: [{ name: '', quantity: '' }],
        instructions: [''],
        published_at: new Date().toISOString().split('T')[0],
        tags: [''],
        comments: [{}],
        photos: [''],
        does_not_contain: {
            eggs: false,
            fish: false,
            gluten: false,
            milk: false,
            peanuts: false,
            shellfish: false,
            soy: false,
            sugar: false,
            tree_nuts: false,
            wheat: false,
        },
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "recipeType" || name === "mealType") {
            setFormData((prev) => ({
                ...prev,
                type: {
                    ...prev.type,
                    [name === "recipeType" ? "primary" : "secondary"]: value
                }
            }));
        } else if (name === "tags") {
            setFormData((prev) => ({ ...prev, [name]: value.split(', ').map((tag) => tag.trim()) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
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

    const handleInstructionChange = (index, value) => {
        const newInstructions = [...formData.instructions];
        newInstructions[index] = value;
        setFormData((prev) => ({ ...prev, instructions: newInstructions }));
    };

    const handleAddInstruction = () => {
        setFormData((prev) => ({
            ...prev,
            instructions: [...prev.instructions, ''],
        }));
    };

    const handleTagChange = (index, value) => {
        const newTags = [...formData.tags];
        newTags[index] = value;
        setFormData((prev) => ({ ...prev, tags: newTags }));
    };

    const handleAddTag = () => {
        setFormData((prev) => ({
            ...prev,
            tags: [...prev.tags, ''],
        }));
    };

    const handleSubmit = (e) => {
        console.log('Data before submit:');
        console.log(data);
        e.preventDefault();
        setError('Not yet implemented.');
        AddNewRecipe(formData);
    };

    const AddNewRecipe = ({ newRecipe }) => {
        setData((prev) => [...prev, newRecipe]);
    }

    // Use useEffect to log the updated data 
    useEffect(() => { 
        console.log('Data after change:'); 
        console.log(data); 
    }, [data]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-blue-50 w-4/5 mt-10 mb-20">
            <h1 className="text-3xl font-bold mb-6 text-center">Make a Recipe</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="recipeType" className="block text-sm font-medium mb-1">Recipe Type</label>
                    {/* Dropdown for primary from recipeType */}
                    <select
                        id="recipeType"
                        name="recipeType"
                        value={formData.type.primary}
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
                        value={formData.type.secondary}
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
                <label htmlFor="name" className="block text-sm font-medium mb-1">Recipe Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
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
                    rows="6"
                    className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                    required
                />
            </div>
            <div className="w-full">
                <label className="block text-sm font-medium mb-1">Ingredients</label>
                <div className="flex flex-col items-center">
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4 w-full">
                            <input
                                type="text"
                                value={ingredient.name.toLowerCase()}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                placeholder="Ingredient"
                                className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                                required
                            />
                            <input
                                type="text"
                                value={ingredient.quantity.toLowerCase()}
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
                        className="text-blue-950 bg-blue-100 rounded-md p-2 px-4 mt-4 hover:bg-blue-300"
                    >
                        Add Ingredient
                    </button>
                </div>
            </div>
            <div>
                <label htmlFor="instructions" className="block text-sm font-medium mb-1">Instructions</label>
                <div className="flex flex-col items-center">
                    {formData.instructions.map((instruction, index) => (
                        <div key={index} className="gap-4 w-full">
                            <input 
                                type="text"
                                value={instruction}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                                placeholder={`Step ${index + 1}`}
                                className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddInstruction}
                        className="text-blue-950 bg-blue-100 rounded-md p-2 px-4 mt-4 hover:bg-blue-300"
                    >
                        Add Step
                    </button>
                </div>
            </div>
            <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
                <div className="flex flex-col items-center">
                    {formData.tags.map((tag, index) => (
                        <div key={index} className="gap-4 w-full">
                            <input
                                type="text"
                                value={tag.toLowerCase()}
                                onChange={(e) => handleTagChange(index, e.target.value)}
                                placeholder="Tag"
                                className="w-full rounded-md bg-blue-100 text-blue-950 shadow-sm focus:border-blue-300 focus:ring-blue-300"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddTag}
                        className="text-blue-950 bg-blue-100 rounded-md p-2 px-4 mt-4 hover:bg-blue-300"
                    >
                        Add Tag
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <button type="submit" className="text-blue-950 bg-blue-100 rounded-md p-2 px-4 hover:bg-blue-300">Submit</button>
            </div>
            
            {error && <p>{error}</p>}
        </form>
    );
}