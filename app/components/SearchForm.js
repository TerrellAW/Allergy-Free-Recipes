"use client";

import { useState, useRef, useEffect } from "react";

export default function SearchForm({recipeData, onSearch}) {
    const [data] = useState(recipeData?.items || []); 
    const [searchText, setSearchText] = useState('');
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
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [showCheckboxes, setShowCheckboxes] = useState(false);

    const checkboxesRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (showCheckboxes) {
            checkboxesRef.current.style.maxHeight = `${checkboxesRef.current.scrollHeight}px`;
        } else {
            checkboxesRef.current.style.maxHeight = '0';
        }
    }, [showCheckboxes]);

    useEffect(() => {
        const anyCheckboxChecked = milk || eggs || fish || shellfish || treeNuts || peanuts || wheat || soy || gluten || sugar;
        setShowCheckboxes(anyCheckboxChecked || document.activeElement === inputRef.current);
    }, [milk, eggs, fish, shellfish, treeNuts, peanuts, wheat, soy, gluten, sugar]);

    const handleSearch = () => { 
        console.log('searchText:', searchText);
        console.log('data:', data);

        if (!searchText && !milk && !eggs && !fish && !shellfish && !treeNuts && !peanuts && !wheat && !soy && !gluten && !sugar) {
            setError('Enter a search term or check a box to continue.');
            setResults([]);
            return;
        }

        setError('');

        const filteredResults = data.filter(item => 
            (searchText ?
                item.type.primary.toLowerCase().includes(searchText.toLowerCase()) ||
                item.type.secondary.toLowerCase().includes(searchText.toLowerCase()) ||
                item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.author.toLowerCase().includes(searchText.toLowerCase()) ||
                item.description.toLowerCase().includes(searchText.toLowerCase()) ||
                item.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(searchText.toLowerCase())) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase())) 
            : true) &&
            (!milk || item.does_not_contain.milk) && 
            (!eggs || item.does_not_contain.eggs) && 
            (!fish || item.does_not_contain.fish) && 
            (!shellfish || item.does_not_contain.shellfish) && 
            (!treeNuts || item.does_not_contain.treeNuts) && 
            (!peanuts || item.does_not_contain.peanuts) &&
            (!wheat || item.does_not_contain.wheat) &&
            (!soy || item.does_not_contain.soy) &&
            (!gluten || item.does_not_contain.gluten) &&
            (!sugar || item.does_not_contain.sugar)
        ); 
        onSearch(filteredResults); 
        console.log('filteredResults:', filteredResults);
    };

    const handleShowCheckboxes = () => {
        setShowCheckboxes(true);
    };

    const handleHideCheckboxes = () => {
        if (
            !milk &&
            !eggs &&
            !fish &&
            !shellfish &&
            !treeNuts &&
            !peanuts &&
            !wheat &&
            !soy &&
            !gluten &&
            !sugar
        )
            setShowCheckboxes(false);
    };

    return ( 
        <div className="w-full  max-w-2xl">
            <h1 className="text-3xl text-center font-bold text-blue-50 mb-5">Allergy-Free Recipes</h1>
            <div className="relative mb-5">
                <input
                    className="w-full p-2 pr-20 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 text-blue-950"
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onFocus={handleShowCheckboxes}
                    onBlur={handleHideCheckboxes}
                    onChange={e => setSearchText(e.target.value)}
                />
                <button
                    className="absolute right-0 top-0 h-full px-4 bg-blue-100 hover:bg-blue-300 text-blue-950 rounded-r-md"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <div
                ref={checkboxesRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: '0' }}
            >
                <h2 className="text-blue-50">Select Your Allergies</h2>
                <div className="bg-blue-100 rounded-md shadow-md p-4 flex text-blue-950">
                    <div className="w-1/2 pr-2">
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input type="checkbox" checked={milk} onChange={e => setMilk(e.target.checked)} className="mr-2" />
                                Milk
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={eggs} onChange={e => setEggs(e.target.checked)} className="mr-2" />
                                Eggs
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={fish} onChange={e => setFish(e.target.checked)} className="mr-2" />
                                Fish
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={shellfish} onChange={e => setShellfish(e.target.checked)} className="mr-2" />
                                Shellfish
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={treeNuts} onChange={e => setTreeNuts(e.target.checked)} className="mr-2" />
                                Tree Nuts
                            </label>
                        </div>
                    </div>
                    <div className="w-1/2 pl-2">
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input type="checkbox" checked={peanuts} onChange={e => setPeanuts(e.target.checked)} className="mr-2" />
                                Peanuts
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={wheat} onChange={e => setWheat(e.target.checked)} className="mr-2" />
                                Wheat
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={soy} onChange={e => setSoy(e.target.checked)} className="mr-2" />
                                Soy
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={gluten} onChange={e => setGluten(e.target.checked)} className="mr-2" />
                                Gluten
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={sugar} onChange={e => setSugar(e.target.checked)} className="mr-2" />
                                Sugar
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}