import AuthButtons from "./AuthButtons";
import AdminButton from "./AdminButton";
import HomeButton from "./HomeButton";

const NavAuth = async () => {

    return (
        <div className="p-[1.5] py-[2.5] w-4/5 h-full flex items-center justify-around text-xl">
            <HomeButton />

            <AdminButton />

            <AuthButtons />
        </div>
    )
}
export default NavAuth