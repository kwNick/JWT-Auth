import { cookies } from "next/headers";

import AuthButtons from "./AuthButtons";
import AdminButton from "./AdminButton";
import HomeButton from "./HomeButton";
import { jwtVerify } from "jose";

const NavAuth = async () => {

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    const isLoggedIn = token && token != "" ? true : false;
    const roleToken = (await cookieStore).get("roleToken");

    let isAdmin = false; // Default to false
    if (roleToken?.value) {
        const { payload }: { payload: { roles: string[] } } = await jwtVerify(roleToken?.value, new TextEncoder().encode("secret-key-making-it-very-strong"));
        // console.log("payload.roles: ", payload.roles);
        isAdmin = payload?.roles?.includes('ROLE_ADMIN') || false; // Check if the user has admin roles
    }

    return (
        <div className="w-full h-full flex items-center justify-around">

            <HomeButton />

            <AdminButton role={isAdmin} isLoggedIn={isLoggedIn} />

            <AuthButtons isLoggedIn={isLoggedIn} />

        </div>
    )
}
export default NavAuth