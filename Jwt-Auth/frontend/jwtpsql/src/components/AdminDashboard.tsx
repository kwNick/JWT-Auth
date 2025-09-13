'use client';

import { useAuth } from "@/context/AuthContext";
import Role from "@/lib/roleModel";
import Shop from "@/lib/shopModel";
import User from "@/lib/userModel";

const AdminDashboard = () => {
    const {user, usersWDetails, users, shops, roles, loading} = useAuth();

    if(loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
    if(!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
  return (
    <>
        {user && (
            <>
                <div className="w-2/5">
                    <h1 className="text-3xl font-semibold mb-4">Hello, Admin - <span className='capitalize'>{user?.username}</span> - <span className='text-xs'>{user?.roles.map((role: Role) => role.name)}</span></h1>
                </div>

                <div className="flex gap-8">
                    <div className="w-full max-w-2xl p-3 bg-gray-300 rounded-tl-2xl rounded-br-2xl shadow-md">

                        <h1 className="text-xl font-semibold mb-4">Profile:</h1>

                        <div className="flex flex-col gap-2">
                            <p><span className="font-semibold">Username</span>: {user?.username}</p>
                            <p><span className="font-semibold">Email</span>: {user?.email}</p>
                            <p><span className="font-semibold">Password</span>: {user?.password}</p>
                            <p><span className="font-semibold">Shops</span>:
                                {user?.shops.map((shop: Shop) => {
                                    return (
                                        <span className="italic" key={shop.name}>{shop.name} - {shop.location} - {shop.user_id}</span>
                                    );
                                })}
                            </p>
                            <p><span className="font-semibold">Roles</span>:
                                {user.roles.map((role: Role) => {
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
                            {user.shops.length > 0 ? (
                                <ul>
                                    {user.shops.map((shop: Shop) => (
                                        <li key={shop.name}>{shop.name} - {shop.location}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>You have no shops.</p>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )}


        <div className='flex flex-col gap-y-5'>
            {usersWDetails && (
                <div>
                    <h1 className="text-xl font-semibold ">All Connections: </h1>
                    {/* <UsersList /> */}
                    <ul>
                        {usersWDetails?.map((user: User) => (
                            <li key={user.username}>{user.username} - {user.email} - {user.password}  - {user.shops.map((shop: Shop) => {
                                return (
                                    <span key={shop.name}>{shop.name} - {shop.location} - {shop.user_id}</span>
                                );
                            })} - {user.roles.map((role: Role) => {
                                return (
                                    <span key={role.name}>{role.name}</span>
                                )
                            })}</li>
                        ))}
                    </ul>
                </div>
            )}

            {users && (
                <div>
                    <h1 className="text-xl font-semibold ">Users</h1>
                    {/* <UsersList /> */}
                    <ul>
                        {users?.map((user: User) => (
                            <li key={user.username}>{user.username} - {user.email} - {user.password}  - {user._links.self.href} - {user._links.user.href} - {user._links.shops.href}- {user._links.roles.href}</li>
                        ))}
                    </ul>
                </div>
            )}

            {shops && (
                <div>
                    <h1 className="text-xl font-semibold ">Shops</h1>
                    {/* <ShopsList /> */}
                    <ul>
                        {shops?.map((shop: Shop) => (
                            <li key={shop.name}>{shop.name} - {shop.location}</li>
                        ))}
                    </ul>
                </div>
            )}

            {roles && (
                <div>
                    <h1 className="text-xl font-semibold ">Roles</h1>
                    {/* <RolesList /> */}
                    <ul>
                        {roles?.map((role: Role) => (
                            <li key={role.name}>{role.id} - {role.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </>
  )
}
export default AdminDashboard