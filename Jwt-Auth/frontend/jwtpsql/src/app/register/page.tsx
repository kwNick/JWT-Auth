'use client';

import { RegisterAction, RegisterState } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const initialState: RegisterState = { message: undefined, errors: {}, success: false }
    const [state, formAction, isPending] = useActionState(RegisterAction, initialState);

    const [isUpdated, setIsUpdated] = useState(false);
    const [formMessage, setFormMessage] = useState("Must update a field to submit!");

    const router = useRouter();
    useEffect(() => {
        // console.log(state);
        // if (state?.success) {
        //     if (state?.role == 'ROLE_ADMIN')
        //         router.replace('/admin-dashboard'); //client-side redirect to admin dashboard
        //     else if (state?.role == 'ROLE_USER')
        //         router.replace('/user-dashboard'); //client-side redirect to user dashboard
        // }

        router.refresh(); // Trigger a soft page reload after registration; If you don't want to use context
    }, [router, state]); //why is state here? Because we want to refresh the page when the state changes, especially after a successful registration.

    useEffect(() => {
        if (isPending) {
            setFormMessage("...Pending Registration");
        }
        if (isUpdated && !isPending) {
            setFormMessage("");
        }
        if (!isUpdated) {
            setFormMessage("Must update fields to Register!");
        }
    }, [isPending, isUpdated]);

    useEffect(() => {
        if (username === "" || password === "" || email === "") {
            setIsUpdated(false);
        } else {
            setIsUpdated(true);
        }
    }, [username, password, email]);

    return (
        <div className="pt-5 flex flex-col items-center justify-center min-h-[75vh] bg-white rounded-tl-2xl rounded-br-2xl shadow-md">
            <h2 className="text-3xl font-bold">Register</h2>
            {/* < RegisterForm /> */}
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

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    Register
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
                <div id="rated-error" aria-live="polite" aria-atomic="true">
                    {state?.errors?.email &&
                        state.errors.email.map((error: string) => (
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
};