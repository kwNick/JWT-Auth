'use client';
import { LogoutAction } from "@/lib/action";
import Link from "next/link"
import { useEffect, useState, useTransition } from "react";

const AdminButton = ({ role, isLoggedIn }: { role: boolean, isLoggedIn: boolean }) => {
    const [login, setLogin] = useState(isLoggedIn);

    useEffect(() => {
        setLogin(isLoggedIn);
    }, [isLoggedIn]);

    return (
        <>
            <Link href={'/admin-dashboard'} className={`${role ? 'block' : 'hidden'} bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded`}>
                Admin
            </Link>
            <Link href={'/user-dashboard'} className={`${isLoggedIn ? 'block' : 'hidden'} bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded`}>
                Dashboard
            </Link>
        </>
    )
}
export default AdminButton