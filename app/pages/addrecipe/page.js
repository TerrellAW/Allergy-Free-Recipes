"use client";

import { useState, useEffect } from 'react';
import { useUserAuth } from "@/app/_utils/auth-context";

import Link from 'next/link';

import AddForm from '../../components/AddForm';
import GetData from '@/app/api/GetData';

export default function AddRecipePage() {
    const [data, setData] = useState(null);
    const { user } = useUserAuth();

    useEffect(() => {
        async function fetchData() {
            const fetchedData = await GetData();
            setData(fetchedData);
        }

        fetchData();
    }, []);

    if (!user) {
        return (
            <main className='min-h-screen bg-blue-950 flex flex-col items-center justify-center relative'>
                <h1 className='text-4xl text-blue-50 mb-5'>You must be logged in to add a recipe</h1>
                <Link href="./login" className='p-2 px-4 bg-blue-100 text-center hover:bg-blue-300 text-blue-950 rounded-md'>Login</Link>
            </main>
        );
    }

    if (!data) {
        return (
            <main className='min-h-screen bg-blue-950 flex flex-col items-center justify-center relative'>
                <h1 className='text-4xl text-blue-50'>Loading...</h1>
            </main>
        );
    }

    return (
        <main className='bg-blue-950 min-h-screen flex flex-col items-center'>
            <Link href="/" className='max-h-12 p-2 px-4 bg-blue-100 text-center hover:bg-blue-300 text-blue-950 rounded-md'>Home</Link>
            <AddForm recipeData={data} />
        </main>
    );
}