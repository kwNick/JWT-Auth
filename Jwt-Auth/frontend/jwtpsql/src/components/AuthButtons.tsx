'use client';
import Link from "next/link"
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const AuthButtons = () => {
    const [isPending, startTransition] = useTransition();
    const { user, logout } = useAuth();

    const router = useRouter();

    const handleSignout2 = () => {
        startTransition(() => {
            logout();
        });
        // router.replace('/');
        router.refresh(); // Trigger a soft page reload after logout; If you don't want to use context
    };

    return (
        <>
            {/* <LoginNavItems isLoggedIn={login} /> */}
            <div className={`${!user ? 'block' : 'hidden'} w-full h-full flex items-center justify-end gap-4 xl:gap-6 2xl:gap-8`}>
                <Link href="/login-client" className=" duration-300 font-bold py-2 px-4 border-2 border-black">
                    LoginClient
                </Link>
                <Link href="/register-client" className=" duration-300 font-bold py-2 px-4 border-2 border-black">
                    RegisterClient
                </Link>
                {/* <Link href="/login" className="bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded">
                    Login
                </Link>
                <Link href="/login-api" className="bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded">
                    LoginAPI
                </Link> */}
                {/* <Link href="/register" className="bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded">
                    Register
                </Link>
                <Link href="/register-api" className="bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded">
                    RegisterAPI
                </Link> */}
            </div>

            <div className={`${user ? 'block' : 'hidden'}`}>
                <button
                    onClick={handleSignout2}
                    disabled={isPending}
                    className={`font-bold py-2 px-4 border-2 border-black`}>
                    {isPending ? 'Logging Out...' : 'Logout'}
                </button>
            </div>
        </>
    )
}
export default AuthButtons