"use client";

import { useState, useEffect } from 'react';

import AddForm from '../../components/AddForm';
import GetData from '@/app/api/GetData';

export default function AddRecipePage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const fetchedData = await GetData();
            setData(fetchedData);
        }

        fetchData();
    }, []);

    if (!data) {
        return (
            <main className='min-h-screen bg-blue-950 flex flex-col items-center justify-center relative'>
                <h1 className='text-4xl text-blue-50'>Loading...</h1>
            </main>
        );
    }

    return (
        <main className='bg-blue-950 min-h-screen flex justify-center'>
            <AddForm recipeData={data} />
        </main>
    );
}