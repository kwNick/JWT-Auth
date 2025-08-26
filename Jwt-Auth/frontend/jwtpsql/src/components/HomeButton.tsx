import Link from "next/link"

const HomeButton = () => {
    return (
        <div className=" h-full flex items-center justify-center">
            <Link href="/" className="bg-secondary hover:bg-accent duration-300 font-bold py-2 px-4 rounded" >
                POS
            </Link>
        </div>
    )
}
export default HomeButton