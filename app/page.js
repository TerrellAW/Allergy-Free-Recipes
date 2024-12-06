"use client";

import { useState, useEffect } from "react";

import SearchForm from "./components/SearchForm";
import GetData from "./api/GetData";

export default function Home() {
  const [data, setData] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await GetData();
      setData(fetchedData);
    }

    fetchData();
  }, []); // Add dependency for triggering effect whenever new data is added to the Pantry

  if (!data) {
    return (
      <main className="min-h-screen bg-blue-950 flex flex-col items-center justify-center relative">
        <h1 className="text-4xl text-blue-50">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-blue-950 flex flex-col items-center justify-center relative">
      <div className="mt-10">
        <SearchForm recipeData={data} onSearch={setResults} />
      </div>
            
      <div className="flex-grow p-6 overflow-auto">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item, index) => (
            <div key={index} className="bg-blue-900 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{item.name}</h2>
                <p className="text-sm text-blue-300 mb-4">{item.author} - {item.type.primary} - {item.type.secondary}</p>
                <p className="text-white mb-4">{item.description}</p>
                <h3 className="text-lg font-semibold text-white mb-2">Ingredients</h3>
                <ul className="list-disc pl-5 mb-4 text-white">
                  {item.ingredients.map((ingredient, idx) => (
                    <li key={idx}>
                      {ingredient.name} - {ingredient.quantity}
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold text-white mb-2">Instructions</h3>
                <ol className="list-decimal pl-5 mb-4 text-white">
                  {item.instructions.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ol>
                <p className="text-sm text-blue-300">Date Posted: {item.published_at}</p>
                <h3 className="text-lg font-semibold text-white mt-4 mb-2">Comments</h3>
                {item.comments.map((comment, idx) => (
                  <div key={idx} className="border-t border-blue-700 pt-2 mb-2">
                    <p className="font-semibold text-white">{comment.author} - {comment.timestamp}</p>
                    <p className="text-white">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
