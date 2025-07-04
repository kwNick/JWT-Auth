'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SignoutButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const [login, setLogin] = useState(isLoggedIn);

    const router = useRouter();

    const handleSignout = async () => {
        const data = await fetch('/api/signout', { method: 'POST' });
        // console.log(data);
        router.replace('/login');
        router.refresh(); // Trigger a soft page reload after logout; If you don't want to use context

    };

    useEffect(() => {
        setLogin(isLoggedIn);
    }
        , [isLoggedIn]);
    return (
        <button onClick={handleSignout} className={`${login ? 'block' : 'hidden'} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
            Signout
        </button>
    )
}
export default SignoutButton