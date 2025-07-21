import DeleteButton from "@/components/DeleteButton";
import { fetchProfile, fetchRoles, fetchShops, fetchUsers, fetchUsersWithDetails } from "@/lib/data";
import Role from "@/lib/roleModel";
import Shop from "@/lib/shopModel";
import User from "@/lib/userModel";
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

    const userDetails: User[] = await fetchUsersWithDetails();
    // console.log(userDetails);

    const res = await fetchUsers();
    const users: User[] = res._embedded.users;
    // console.log(users);

    const res2 = await fetchShops();
    const shops: Shop[] = res2._embedded.shops;
    // console.log(shops);

    const res3 = await fetchRoles();
    const roles: Role[] = res3._embedded.roles;
    // console.log(roles);

    return (
        <div className="p-4 flex flex-col items-start justify-center bg-white rounded-tl-2xl rounded-br-2xl shadow-md">
            <h1 className="text-xl font-semibold mb-4">Hello, User - {profile.username} - <span className='text-xs'>{profile.roles.map(role => role.name)}</span></h1>

            <div>
                <h2>Your Shops</h2>
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
            </div>

            {/* <h1 className="text-xl font-semibold mb-4">Cookies User from login/registration: {JSON.stringify(user)}</h1> */}

            <h1 className="text-xl font-semibold mb-4">Fetched from springboot /api/profile:</h1>
            <div>
                <p>{profile.username} - {profile.email} - {profile.password}  - {profile.shops.map((shop: Shop) => {
                    return (
                        <span className="italic" key={shop.name}>{shop.name} - {shop.location} - {shop.user_id}</span>
                    );
                })} - {profile.roles.map((role: Role) => {
                    return (
                        <span className="italic" key={role.name}>{role.name}</span>
                    )
                })}</p>
            </div>

            {/* <h1 className="text-xl font-semibold mb-4">All Connections: </h1> */}
            {/* <UsersList /> */}
            {/* <ul>
                {userDetails.map((user: User) => (
                    <li key={user.username}>{user.username} - {user.email} - {user.password}  - {user.shops.map((shop) => {
                        return (
                            <span className="italic" key={shop.name}>{shop.name} - {shop.location} - {shop.user_id}</span>
                        );
                    })} - {user.roles.map((role) => {
                        return (
                            <span className="italic" key={role.name}>{role.name}</span>
                        )
                    })}</li>
                ))}
            </ul>

            <h1 className="text-xl font-semibold mb-4">Users</h1> */}
            {/* <UsersList /> */}
            {/* <ul>
                {users.map((user: User) => (
                    <li key={user.username}>{user.username} - {user.email} - {user.password}  - {user._links.self.href} - {user._links.user.href} - {user._links.shops.href}- {user._links.roles.href}</li>
                ))}
            </ul> */}

            {/* <h1 className="text-xl font-semibold mb-4">Shops</h1> */}
            {/* <ShopsList /> */}
            {/* <ul>
                {shops.map((shop: Shop) => (
                    <li key={shop.name}>{shop.name} - {shop.location}</li>
                ))}
            </ul> */}

            {/* <h1 className="text-xl font-semibold mb-4">Roles</h1> */}
            {/* <RolesList /> */}
            {/* <ul>
                {roles.map((role: Role) => (
                    <li key={role.name}>{role.id} - {role.name}</li>
                ))}
            </ul> */}

            <div>
                <h1>
                    DeleteUser...
                </h1>
                <div>
                    <p>
                        To delete a user, you can use the <code>DELETE</code> HTTP method on the endpoint:
                    </p>DELETE on http://localhost:8080/api/delete`
                    <p>
                        Note: Make sure to handle this operation carefully as it will permanently remove the user and their associated data.
                    </p>
                </div>
                <DeleteButton />
            </div>
        </div>
    )
}
export default page