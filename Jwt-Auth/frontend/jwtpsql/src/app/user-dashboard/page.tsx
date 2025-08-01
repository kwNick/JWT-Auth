import DeleteButton from "@/components/DeleteButton";
import { fetchProfile } from "@/lib/data";
// import { fetchRoles, fetchShops, fetchUsers, fetchUsersWithDetails } from "@/lib/data";
import Role from "@/lib/roleModel";
import Shop from "@/lib/shopModel";
import User from "@/lib/userModel";
import Link from "next/link";
// import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";

// import jwt from "jsonwebtoken"; // if you want to decode the JWT token

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

            <div className="w-2/5">
                <h1 className="text-3xl font-semibold mb-4">Hello, User - {profile.username} - <span className='text-xs'>{profile.roles.map(role => role.name)}</span></h1>
            </div>

            <div className="flex gap-8">
                <div className="w-full max-w-2xl p-3 bg-gray-300 rounded-tl-2xl rounded-br-2xl shadow-md">

                    <h1 className="text-xl font-semibold mb-4">Fetched from springboot /api/profile:</h1>

                    <div className="flex flex-col gap-2">
                        <p><span className="font-semibold">Username</span>: {profile.username}</p>
                        <p><span className="font-semibold">Email</span>: {profile.email}</p>
                        <p><span className="font-semibold">Password</span>: {profile.password}</p>
                        <p><span className="font-semibold">Shops</span>:
                            {profile.shops.map((shop: Shop) => {
                                return (
                                    <span className="italic" key={shop.name}>{shop.name} - {shop.location} - {shop.user_id}</span>
                                );
                            })}
                        </p>
                        <p><span className="font-semibold">Roles</span>:
                            {profile.roles.map((role: Role) => {
                                return (
                                    <span className="italic" key={role.name}>{role.name}</span>
                                )
                            })}
                        </p>
                    </div>
                </div>


                <div className="w-full max-w-2xl p-3 bg-gray-300 rounded-tl-2xl rounded-br-2xl shadow-md">

                    <h2 className="text-xl font-semibold mb-4">Your Shops</h2>

                    <div>
                        {profile.shops.length > 0 ? (
                            <ul>
                                {profile.shops.map((shop: Shop) => (
                                    <li key={shop.name}>{shop.name} - {shop.location}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>You have no shops.</p>
                        )}
                    </div>
                    <div>
                        <Link href="/edit-shops" className="text-blue-500 hover:underline">
                            Edit Shops
                        </Link>
                    </div>
                </div>
            </div>

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