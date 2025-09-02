"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You are not logged in.</p>;

  return (
    <div className="p-4 flex flex-col gap-y-5 justify-center min-h-[85vh] font-[family-name:var(--font-geist-sans)] bg-white rounded-tl-2xl rounded-br-2xl shadow-md">
      {loading && <div><p>Loading...</p></div>}
      {!user && !loading && <div><p>You are not logged in.</p></div>}
      {user && !loading &&
        (
          <>
            <div className="w-2/5">
              <h1 className="text-3xl font-semibold mb-4">
                Hello, {user.username} -{" "}
                <span className="text-xs">{user.roles.map(r => r.name).join(", ")}</span>
              </h1>
            </div>

            <div className="flex gap-8">
              <div className="w-full max-w-2xl p-3 bg-gray-300 rounded-tl-2xl rounded-br-2xl shadow-md">
                <h1 className="text-xl font-semibold mb-4">Fetched from Spring Boot /api/profile:</h1>
                <div className="flex flex-col gap-2">
                  <p><span className="font-semibold">Username</span>: {user.username}</p>
                  <p><span className="font-semibold">Email</span>: {user.email}</p>
                  <p><span className="font-semibold">Password</span>: {user.password}</p>
                  <p><span className="font-semibold">Shops</span>:
                    {user.shops.map(shop => (
                      <span className="italic" key={shop.name}>
                        {shop.name} - {shop.location} - {shop.user_id}
                      </span>
                    ))}
                  </p>
                  <p><span className="font-semibold">Roles</span>:
                    {user.roles.map(role => (
                      <span className="italic" key={role.name}>{role.name}</span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="w-full max-w-2xl p-3 bg-gray-300 rounded-tl-2xl rounded-br-2xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Your Shops</h2>
                {user.shops.length > 0 ? (
                  <ul>
                    {user.shops.map(shop => (
                      <li key={shop.name}>{shop.name} - {shop.location}</li>
                    ))}
                  </ul>
                ) : (
                  <p>You have no shops.</p>
                )}
                <div>
                  <Link href="/edit-shops" className="text-blue-500 hover:underline">
                    Edit Shops
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div>
                <h1>DeleteUser...</h1>
              </div>
              <div>
                <p>To delete a user, use the <code>DELETE</code> HTTP method on the endpoint: <code>DELETE http://localhost:8080/api/delete</code></p>
                <p>Note: This will permanently remove the user and all associated data.</p>
              </div>
              <div>
                <DeleteButton />
              </div>
            </div>
          </>
        )
      }
    </div>
  );
}
