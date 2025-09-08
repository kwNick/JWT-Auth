'use client';
import { useAuth } from "@/context/AuthContext";
import Link from "next/link"

const AdminButton = () => {
    const { user, role } = useAuth();
    // console.log("roleToken: ", roleToken);

    return (
        <>
            <Link href={'/admin-dashboard'} className={`${role?.includes('ROLE_ADMIN') ? 'block' : 'hidden'} bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded`}>
                Admin
            </Link>
            <Link href={'/dashboard'} className={`${user ? 'block' : 'hidden'} bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded`}>
                Dashboard
            </Link>
        </>
    )
}
export default AdminButton