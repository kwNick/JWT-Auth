import Link from "next/link"

const HomeButton = () => {
    return (
        <div className="w-1/3 h-full flex items-center justify-around">
            <Link href="/" className="bg-background hover:bg-accent duration-300 font-bold py-2 px-4 rounded" >
                POS
            </Link>
        </div>
        // <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
        //     POS
        // </Link>
    )
}
export default HomeButton