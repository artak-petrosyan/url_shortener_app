import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between py-4 px-16 fixed w-full">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                <Link href="/">
                    <Image src="/logo.png" width={60} height={60} alt="Logo" />
                </Link>
                URL Shortener</div>
            <div className="flex items-center justify-center gap-4">
            </div>
        </nav>
    );
}