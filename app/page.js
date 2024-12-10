"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "./_utils/auth-context";

import Link from "next/link";

import SearchForm from "./components/SearchForm";
import GetData from "./api/GetData";

export default function Home() {
  const [data, setData] = useState(null);
  const [results, setResults] = useState([]);
  const { user } = useUserAuth();

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await GetData();
      setData(fetchedData);
    }

    fetchData();
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-blue-950 flex flex-col items-center justify-center relative">
        <h1 className="text-4xl text-blue-50">Loading...</h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col">
      <header className="sticky top-0 z-10 bg-blue-950 shadow-md min-w-full">
        <div className="flex flex-col items-center justify-center">
          <Link href="./pages/addrecipe" className="absolute left-5 top-24 p-2 px-4 bg-blue-100 text-center hover:bg-blue-300 text-blue-950 rounded-md">
              Add Recipe
          </Link>
          <div className="mt-10">
            <SearchForm recipeData={data} onSearch={setResults} />
          </div>
          {user ? (
            <Link href="./pages/login" className="absolute right-5 top-24 p-2 px-4 bg-blue-100 text-center hover:bg-blue-300 text-blue-950 rounded-md">
              Logout
            </Link>
          ) : (
            <Link href="./pages/login" className="absolute right-5 top-24 p-2 px-4 bg-blue-100 text-center hover:bg-blue-300 text-blue-950 rounded-md">
              Login
            </Link>
          )}
        </div>
      </header>
      <main className="items-center justify-center relative">    
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
    </div>
  );
}
