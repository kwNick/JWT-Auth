'use client';
import { useAuth } from "@/context/AuthContext";
import Role from "@/lib/roleModel";
import Shop from "@/lib/shopModel";
import Link from "next/link";

const ProfileDashboard = () => {
    const { user } = useAuth();
  return (
    <>
        {user && (
            <>
            <div className="w-2/5">
            <h1 className="text-3xl font-semibold mb-4">Hello, User - {user.username} - <span className='text-xs'>{user.roles.map(role => role.name)}</span></h1>
        </div>

        <div className="flex gap-8">
            <div className="w-full max-w-2xl p-3 bg-gray-300 rounded-tl-2xl rounded-br-2xl shadow-md">

                <h1 className="text-xl font-semibold mb-4">Fetched from springboot /api/profile:</h1>

                <div className="flex flex-col gap-2">
                    <p><span className="font-semibold">Username</span>: {user.username}</p>
                    <p><span className="font-semibold">Email</span>: {user.email}</p>
                    <p><span className="font-semibold">Password</span>: {user.password}</p>
                    <p><span className="font-semibold">Shops</span>:
                        {user.shops.map((shop: Shop) => {
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
                <div>
                    <Link href="/edit-shops" className="text-blue-500 hover:underline">
                        Edit Shops
                    </Link>
                </div>
            </div>
        </div>
            </>
        )}
    </>
  )
}
export default ProfileDashboard