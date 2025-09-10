import Link from "next/link"

const HomeButton = () => {
    return (
        <div className="min-w-fit h-full flex items-center justify-center">
            <Link href="/" className=" duration-300 font-bold py-2 px-4 " >
                JWT-AUTH
            </Link>
        </div>
    )
}
export default HomeButton