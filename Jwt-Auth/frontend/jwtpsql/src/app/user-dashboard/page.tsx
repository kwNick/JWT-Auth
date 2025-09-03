import DeleteButton from "@/components/DeleteButton";
import ProfileDashboard from "@/components/ProfileDashboard";
import { fetchProfile } from "@/lib/data";
// import { fetchRoles, fetchShops, fetchUsers, fetchUsersWithDetails } from "@/lib/data";
import Role from "@/lib/roleModel";
import Shop from "@/lib/shopModel";
import User from "@/lib/userModel";
import Link from "next/link";
// import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";

// import jwt from "jsonwebtoken"; // if you want to decode the JWT token


// That’s why your /refresh route can’t see the refreshToken:
// The refresh cookie is httpOnly and scoped to the browser.
// When you call from a server component, Next.js runs that request from Vercel’s server, which doesn’t have the browser’s cookies.
// So Spring Boot never receives the refreshToken → you get null.
// ✅ Fix: Move /auth/refresh and fetchProfile to the client side

const page = async () => {
    // const cookieStore = cookies();  //for server-side cookies use cookies from next/headers

    // const token = (await cookieStore).get('token')?.value ?? "";

    // const userData = (await cookieStore).get('user')?.value ?? "";
    // const user = userData ? JSON.parse(userData) : null; // parse user data from cookie, if it exists

    // console.log(`JWT: ${token}`); //maybe add a try/catch here to check if token is null
    // console.log(user);

    // const decodedJwt = jwtDecode(token);
    // console.log(`Decoded JWT: ${decodedJwt.sub}`); // decode the JWT to see the user information that was encoded in it
    // const decodedJwt = jwt.verify(token, 'secret-key-making-it-very-strong').sub; // Same secret used in Spring Boot

    const profile: User = await fetchProfile();
    // console.log(profile);

    // const userDetails: User[] = await fetchUsersWithDetails();
    // // console.log(userDetails);

    // const res = await fetchUsers();
    // const users: User[] = res._embedded.users;
    // // console.log(users);

    // const res2 = await fetchShops();
    // const shops: Shop[] = res2._embedded.shops;
    // // console.log(shops);

    // const res3 = await fetchRoles();
    // const roles: Role[] = res3._embedded.roles;
    // console.log(roles);

    return (
        <div className="p-4 flex flex-col gap-y-5 justify-center min-h-[85vh] font-[family-name:var(--font-geist-sans)] bg-white rounded-tl-2xl rounded-br-2xl shadow-md">

           <ProfileDashboard />

            <div className="flex flex-col gap-y-4">
                <div>
                    <h1>
                        DeleteUser...
                    </h1>
                </div>
                <div>
                    <p>
                        To delete a user, you can use the <code>DELETE</code> HTTP method on the endpoint:
                    </p>DELETE on http://localhost:8080/api/delete`
                    <p>
                        Note: Make sure to handle this operation carefully as it will permanently remove the user and their associated data.
                    </p>
                </div>
                <div>
                    <DeleteButton />
                </div>
            </div>
        </div>
    )
}
export default page