'use client';

import { AddShopAction, AddShopState } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const AddShopForm = () => {

    const [shopName, setShopName] = useState("");
    const [location, setLocation] = useState("");
    const initialState: AddShopState = { message: undefined, errors: {}, success: false }
    const [state, formAction, isPending] = useActionState(AddShopAction, initialState);

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
        // if(state){

        // }
        router.refresh(); // Trigger a soft page reload after registration; If you don't want to use context
    }, [router, state]); //why is state here? Because we want to refresh the page when the state changes, especially after a successful registration.

    useEffect(() => {
        if (isPending) {
            setFormMessage("...Pending Add Shop!");
        }
        if (isUpdated && !isPending) {
            setFormMessage("");
        }
        if (!isUpdated) {
            setFormMessage("Must update fields to Add Shop!");
        }

    }, [isPending, isUpdated]);

    useEffect(() => {
        if (shopName === "" || location === "") {
            setIsUpdated(false);
        } else {
            setIsUpdated(true);
        }
    }, [shopName, location]);
    return (
        <>
            <h2 className="text-3xl font-bold">Add a Shop</h2>

            <form action={formAction} className="space-y-4 w-3/5">
                <label htmlFor="name">Shop Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Shop Name"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="border p-2 w-full mb-4"
                    required
                />

                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 w-full mb-4"
                    required
                />

                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Add Shop
                </button>

                <div id="rated-error" aria-live="polite" aria-atomic="true">
                    {state?.errors?.name &&
                        state.errors.name.map((error: string) => (
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
                    {state?.errors?.location &&
                        state.errors.location.map((error: string) => (
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
        </>
    )
}
export default AddShopForm