'use client';
import { useAuth } from "@/context/AuthContext";

const ProfileDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
  if (!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
  return (
    <>
        {user && (
          <>
            <div className="">
              <h1 className="text-3xl font-semibold mb-4">
                Hello, {user.username} -{" "}
                <span className="text-xs">{user.roles.map(r => r.name).join(", ")}</span>
              </h1>
            </div>

            <div className="flex flex-col gap-8">
              <div className="w-full max-w-2xl ">
                <h1 className="text-xl font-semibold mb-4 underline">Profile:</h1>
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
            </div>
          </>
        )}
    </>
  )
}
export default ProfileDashboard