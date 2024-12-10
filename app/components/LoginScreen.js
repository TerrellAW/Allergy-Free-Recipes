"use client";

import { useUserAuth } from "../_utils/auth-context";

import Link from "next/link";

// Users need to be logged in to add recipes or make comments
export default function LoginScreen() {
    const { user, signInWithGoogle, signInWithGithub, logout } = useUserAuth();

    const displayName = user?.displayName || "Anonymous User";
    
    const handleLogin = async (provider) => {
        if (provider === "google") {
            await signInWithGoogle();
        } else if (provider === "github") {
            await signInWithGithub();
        }
    }

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {user ? (
                <div className="flex flex-col space-y-6">
                    <h1 className="text-4xl">Welcome, {displayName}</h1>
                    <Link href="/" className="p-2 px-4 bg-blue-100 text-center hover:bg-blue-300 text-blue-950 rounded-md">Go Home</Link>
                    <button onClick={handleLogout} className="p-2 px-4 bg-red-100 text-center hover:bg-blue-300 text-blue-950 rounded-md">Logout</button>
                </div>
            ) : (
                <div className="flex flex-col space-y-6">
                    <button onClick={() => handleLogin("google")} className="p-2 px-4 bg-blue-100 text-center hover:bg-blue-300 text-blue-950 rounded-md">Login with Google</button>
                    <button onClick={() => handleLogin("github")} className="p-2 px-4 bg-blue-100 text-center hover:bg-blue-300 text-blue-950 rounded-md">Login with Github</button>
                </div>
            )}
        </div>
    )
}