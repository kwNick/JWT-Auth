import Link from "next/link"

const HomeButton = () => {
    return (
        <div className="w-1/3 h-full flex items-center justify-around">
            <Link href="/" className="bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded" >
                POS
            </Link>
        </div>
    )
}
export default HomeButton