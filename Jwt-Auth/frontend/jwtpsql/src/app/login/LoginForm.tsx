'use client'

import { useActionState, useEffect, useState } from 'react'
import { LoginAction, State } from '@/lib/action'
// import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const initialState: State = { message: undefined, errors: {}, success: false }
    const [state, formAction, isPending] = useActionState(LoginAction, initialState);

    const [isUpdated, setIsUpdated] = useState(false);
    const [formMessage, setFormMessage] = useState("Must update a field to submit!");

    // const router = useRouter(); //client-side redirect
    // useEffect(() => {       //might not need this if middleware works appropriately
    //     if (state?.success) {
    //         //add a context that stores the user information so we can use it in the dashboard
    //         router.replace('/user-dashboard'); //client-side redirect
    //         //or redirect to admin dashboard if the user is an admin
    //         //need to put user in cookies on login and registration
    //     }
    // }, [router, state.success]);

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
        <form action={formAction} className="space-y-4">
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
    )
}
export default LoginForm