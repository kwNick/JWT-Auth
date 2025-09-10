'use client';
import { useAuth } from "@/context/AuthContext";
import Link from "next/link"

const AdminButton = () => {
    const { user, role } = useAuth();
    // console.log("roleToken: ", roleToken);

    return (
        <>
            <Link href={'/admin'} className={`${role?.includes('ROLE_ADMIN') ? 'block' : 'hidden'} duration-300 font-bold py-2 px-4 border-2 border-black`}>
                Admin
            </Link>
            <Link href={'/dashboard'} className={`${user ? 'block' : 'hidden'} duration-300 font-bold py-2 px-4 border-2 border-black`}>
                Dashboard
            </Link>
        </>
    )
}
export default AdminButton