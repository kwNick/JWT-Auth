import Link from "next/link"

const AdminButton = ({ role, isLoggedIn }: { role: boolean, isLoggedIn: boolean }) => {

    return (
        <>
            <Link href={'/admin-dashboard'} className={`${role ? 'block' : 'hidden'} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
                Admin
            </Link>
            <Link href={'/user-dashboard'} className={`${isLoggedIn ? 'block' : 'hidden'} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
                Dashboard
            </Link>
        </>
    )
}
export default AdminButton