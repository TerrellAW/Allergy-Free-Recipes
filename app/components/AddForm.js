"use client";

import { useState, useEffect } from "react";

import recipeTypeData from "../data/recipeTypes.json";
import PutData from "../api/PutData";

export default function MakeRecipe({ recipeData }) {
    const [data, setData] = useState(recipeData?.items || []);

    const [formData, setFormData] = useState({
        id: data.length + 1, // Might not work due to async nature of data
        author: 'AnonymousUser',
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
            eggs: true,
            fish: true,
            gluten: true,
            milk: true,
            peanuts: true,
            shellfish: true,
            soy: true,
            sugar: true,
            tree_nuts: true,
            wheat: true,
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
        // Check for allergen matches in ingredients
        const allergenMatches = formData.ingredients.some(ingredient => {
            const ingredientName = ingredient.name.toLowerCase();
            
            if (ingredientName.includes('egg')) formData.does_not_contain.eggs = false;
            if (ingredientName.includes('fish')) formData.does_not_contain.fish = false;
            if (ingredientName.includes('salmon')) formData.does_not_contain.fish = false;
            if (ingredientName.includes('tuna')) formData.does_not_contain.fish = false;
            if (ingredientName.includes('trout')) formData.does_not_contain.fish = false;
            if (ingredientName.includes('cod')) formData.does_not_contain.fish = false;
            if (ingredientName.includes('haddock')) formData.does_not_contain.fish = false;
            if (ingredientName.includes('halibut')) formData.does_not_contain.fish = false;
            if (ingredientName.includes('sardine')) formData.does_not_contain.fish = false;
            if (ingredientName.includes('anchovy')) formData.does_not_contain.fish = false;
            if (ingredientName.includes('wheat')) formData.does_not_contain.gluten = false;
            if (ingredientName.includes('flour')) formData.does_not_contain.gluten = false;
            if (ingredientName.includes('bread')) formData.does_not_contain.gluten = false;
            if (ingredientName.includes('rye')) formData.does_not_contain.gluten = false;
            if (ingredientName.includes('barley')) formData.does_not_contain.gluten = false;
            if (ingredientName.includes('oat')) formData.does_not_contain.gluten = false;
            if (ingredientName.includes('milk')) formData.does_not_contain.milk = false;
            if (ingredientName.includes('butter')) formData.does_not_contain.milk = false;
            if (ingredientName.includes('cheese')) formData.does_not_contain.milk = false;
            if (ingredientName.includes('cream')) formData.does_not_contain.milk = false;
            if (ingredientName.includes('yogurt')) formData.does_not_contain.milk = false;
            if (ingredientName.includes('peanut')) formData.does_not_contain.peanuts = false;
            if (ingredientName.includes('shellfish')) formData.does_not_contain.shellfish = false;
            if (ingredientName.includes('shrimp')) formData.does_not_contain.shellfish = false;
            if (ingredientName.includes('crab')) formData.does_not_contain.shellfish = false;
            if (ingredientName.includes('lobster')) formData.does_not_contain.shellfish = false;
            if (ingredientName.includes('clam')) formData.does_not_contain.shellfish = false;
            if (ingredientName.includes('oyster')) formData.does_not_contain.shellfish = false;
            if (ingredientName.includes('mussel')) formData.does_not_contain.shellfish = false;
            if (ingredientName.includes('scallop')) formData.does_not_contain.shellfish = false;
            if (ingredientName.includes('crayfish')) formData.does_not_contain.shellfish = false;
            if (ingredientName.includes('prawn')) formData.does_not_contain.soy = false;
            if (ingredientName.includes('soy')) formData.does_not_contain.soy = false;
            if (ingredientName.includes('tofu')) formData.does_not_contain.soy = false;
            if (ingredientName.includes('sugar')) formData.does_not_contain.sugar = false;
            if (ingredientName.includes('honey')) formData.does_not_contain.sugar = false;
            if (ingredientName.includes('maple syrup')) formData.does_not_contain.sugar = false;
            if (ingredientName.includes('agave')) formData.does_not_contain.sugar = false;
            if (ingredientName.includes('berry')) formData.does_not_contain.sugar = false;
            if (ingredientName.includes('berries')) formData.does_not_contain.sugar = false;
            if (ingredientName.includes('fruit')) formData.does_not_contain.sugar = false;
            if (ingredientName.includes('nut')) formData.does_not_contain.tree_nuts = false;
            if (ingredientName.includes('almond')) formData.does_not_contain.tree_nuts = false;
            if (ingredientName.includes('cashew')) formData.does_not_contain.tree_nuts = false;
            if (ingredientName.includes('hazelnut')) formData.does_not_contain.tree_nuts = false;
            if (ingredientName.includes('macadamia')) formData.does_not_contain.tree_nuts = false;
            if (ingredientName.includes('pecan')) formData.does_not_contain.tree_nuts = false;
            if (ingredientName.includes('pistachio')) formData.does_not_contain.tree_nuts = false;
            if (ingredientName.includes('wheat')) formData.does_not_contain.wheat = false;
            if (ingredientName.includes('flour')) formData.does_not_contain.wheat = false;
            if (ingredientName.includes('bread')) formData.does_not_contain.wheat = false;
        });

        AddNewRecipe(formData);
    };

    const AddNewRecipe = async (newRecipe) => {
        await PutData({ items: newRecipe });
    }

    // Use useEffect to log the updated data and call PutData
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