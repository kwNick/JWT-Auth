import Link from "next/link"

const Footer = () => {
    return (
        <>
            <div className="">
                <Link href="/">POS</Link>
            </div>

            <div>
                <p className="text-center text-secondary">
                    © {new Date().getFullYear()} POS System. All rights reserved.
                </p>
            </div>

            <div>
                <ul className="flex items-center gap-x-4">
                    <li><Link href="/login" className="underline">Login</Link></li>
                    <li><Link href="/register" className="underline">Register</Link></li>
                </ul>
            </div>
        </>
    )
}
export default Footer