'use client';
import Link from "next/link"
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
// import { LogoutAction } from "@/lib/action";
import { useAuth } from "@/context/AuthContext";
// import SignoutButton from "./SignoutButton";
// import LoginNavItems from "./LoginNavItems";

const AuthButtons = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const [login, setLogin] = useState(isLoggedIn);
    const [isPending, startTransition] = useTransition();
    const { logout } = useAuth();

    const router = useRouter();

    const handleSignout2 = async () => {
        startTransition(() => {
            logout();
            // LogoutAction();

        });
        router.replace('/');
        // router.refresh(); // Trigger a soft page reload after logout; If you don't want to use context

    };

    useEffect(() => {
        setLogin(isLoggedIn);
    }, [isLoggedIn]);

    return (
        <>
            {/* <LoginNavItems isLoggedIn={login} /> */}
            <div className={`${!login ? 'block' : 'hidden'} w-full h-full flex items-center justify-end gap-4`}>
                <Link href="/login" className="bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded">
                    Login
                </Link>
                <Link href="/login-api" className="bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded">
                    LoginAPI
                </Link>
                <Link href="/login-client" className="bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded">
                    LoginClient
                </Link>
                <Link href="/register" className="bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded">
                    Register
                </Link>
                <Link href="/register-api" className="bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded">
                    RegisterAPI
                </Link>
            </div>

            {/* <SignoutButton isLoggedIn={login} handleSignout={handleSignout} /> */}
            <div>
                <button
                    onClick={handleSignout2}
                    disabled={isPending}
                    // className={`${login ? 'block' : 'hidden'} bg-secondary hover:bg-accent   font-bold py-2 px-4 rounded`}>
                    // {isPending ? 'Logging Out...' : 'Logout'}
                    className={` bg-secondary hover:bg-accent   font-bold py-2 px-4 rounded`}>
                    {isPending ? 'Logging Out...' : 'Logout'}
                </button>
            </div>
        </>
    )
}
export default AuthButtons