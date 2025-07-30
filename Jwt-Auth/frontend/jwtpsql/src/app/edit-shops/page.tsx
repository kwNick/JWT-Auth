import AddShopForm from "@/components/AddShopForm"
import { fetchProfile } from "@/lib/data";
import Shop from "@/lib/shopModel";
import User from "@/lib/userModel";


const page = async () => {
    const profile: User = await fetchProfile();

    return (
        <div className="w-full min-h-[85vh] flex items-center justify-center ">
            <div className="flex justify-center items-center">
                <h1 className="text-3xl font-bold mb-4">Shop Dashboard</h1>
            </div>

            <div className="w-full p-5 flex items-center gap-x-8">

                <div className="w-full p-4 flex flex-col gap-y-5 items-center justify-center font-[family-name:var(--font-geist-sans)] bg-white rounded-tl-2xl rounded-br-2xl shadow-md">
                    <AddShopForm />
                </div>

                <div className="w-full p-4 flex flex-col gap-y-5 items-center justify-center font-[family-name:var(--font-geist-sans)] bg-white rounded-tl-2xl rounded-br-2xl shadow-md">
                    <h2 className="text-3xl font-bold">Your Shops</h2>

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

            </div>

        </div>
    )
}
export default page