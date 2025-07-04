import Link from "next/link"

const HomeButton = () => {
    return (
        <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
            JWT
        </Link>
    )
}
export default HomeButton