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

    return (
        <main className='bg-blue-950 min-h-screen flex justify-center'>
            <AddForm recipeData={data} />
        </main>
    );
}