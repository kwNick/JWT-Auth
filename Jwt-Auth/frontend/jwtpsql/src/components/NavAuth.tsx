import AuthButtons from "./AuthButtons";
import AdminButton from "./AdminButton";
import HomeButton from "./HomeButton";

const NavAuth = async () => {

    return (
        <div className="p-3 py-5 w-4/5 h-full flex items-center justify-around bg-primary rounded-tl-2xl rounded-br-2xl shadow-md">
            <HomeButton />

            <AdminButton />

            <AuthButtons />
        </div>
    )
}
export default NavAuth