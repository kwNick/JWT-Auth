'use client'

// import LoginForm from "./LoginForm";

import { useActionState, useEffect, useState } from 'react'
import { LoginAction, State } from '@/lib/action'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const initialState: State = { message: undefined, errors: {}, success: false }
    const [state, formAction, isPending] = useActionState(LoginAction, initialState);

    const [isUpdated, setIsUpdated] = useState(false);
    const [formMessage, setFormMessage] = useState("Must update a field to submit!");

    const router = useRouter(); //client-side redirect
    useEffect(() => { //middleware-like effect to handle redirection after login
        // console.log(state);

        // if (state?.success) {
        //     if (state?.role == 'ROLE_ADMIN')
        //         router.replace('/admin-dashboard'); //client-side redirect to admin dashboard
        //     else if (state?.role == 'ROLE_USER')
        //         router.replace('/user-dashboard'); //client-side redirect to user dashboard
        // }

        router.refresh(); // Trigger a soft page reload after login; If you don't want to use context
    }, [router, state]);

    useEffect(() => {
        if (isPending) {
            setFormMessage("...Pending Login");
        }
        if (isUpdated && !isPending) {
            setFormMessage("");
        }
        if (!isUpdated) {
            setFormMessage("Must update fields to Login!");
        }
    }, [isPending, isUpdated]);

    useEffect(() => {
        if (username === "" || password === "") {
            setIsUpdated(false);
        } else {
            setIsUpdated(true);
        }
    }, [username, password]);

    return (
        <div className="pt-5 flex flex-col items-center justify-center min-h-[75vh] bg-white rounded-tl-2xl rounded-br-2xl shadow-md">
            <h2 className="text-3xl font-bold">Login</h2>
            {/* < LoginForm /> */}
            <form action={formAction} className="space-y-4 w-3/5">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Login
                </button>
                <div id="rated-error" aria-live="polite" aria-atomic="true">
                    {state?.errors?.username &&
                        state.errors.username.map((error: string) => (
                            <div key={error}>
                                <p className="mt-2 text-sm text-accent" key={error}>
                                    {error}
                                </p>
                                <p>
                                    {state?.message}
                                </p>
                            </div>
                        ))}
                </div>
                <div id="rated-error" aria-live="polite" aria-atomic="true">
                    {state?.errors?.password &&
                        state.errors.password.map((error: string) => (
                            <div key={error}>
                                <p className="mt-2 text-sm text-accent" key={error}>
                                    {error}
                                </p>
                                <p>
                                    {state?.message}
                                </p>
                            </div>
                        ))}
                </div>
                <p className={` relative opacity-0 mt-2 text-xs text-accent duration-500 ${(isPending || !isUpdated) && 'opacity-100'}`}>{formMessage}</p>
            </form>
            {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
        </div>
    )
}
