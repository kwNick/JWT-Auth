'use client';
import { LogoutAction } from "@/lib/action";
import Link from "next/link"
import { useEffect, useState, useTransition } from "react";

const AdminButton = ({ role, isLoggedIn }: { role: boolean, isLoggedIn: boolean }) => {
    const [login, setLogin] = useState(isLoggedIn);
    const [isPending, startTransition] = useTransition();

    // const router = useRouter();

    const handleSignout2 = async () => { //maybe put this in a server action file
        startTransition(() => {
            LogoutAction();
        });
        // router.replace('/');
        // router.refresh(); // Trigger a soft page reload after logout; If you don't want to use context

    };

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

            {/* <SignoutButton isLoggedIn={login} handleSignout={handleSignout} /> */}
            <div>
                <button
                    onClick={handleSignout2}
                    disabled={isPending}
                    className={`${login ? 'block' : 'hidden'} bg-secondary hover:bg-accent   font-bold py-2 px-4 rounded`}>
                    {isPending ? 'Logging Out...' : 'Logout'}
                </button>
            </div>
        </>
    )
}
export default AdminButton