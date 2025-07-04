'use client';
import Link from "next/link"
import { useEffect, useState } from "react";

const LoginNavItems = ({ isLoggedIn }: { isLoggedIn: boolean }) => {

    const [login, setLogin] = useState(isLoggedIn);

    useEffect(() => {
        setLogin(isLoggedIn);
    }
        , [isLoggedIn]);
    return (
        <div className={`${!login ? 'block' : 'hidden'} w-full h-full flex items-center justify-around`}>
            <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
            </Link>
            <Link href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Register
            </Link>
        </div>
    )
}
export default LoginNavItems