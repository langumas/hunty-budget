import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
    return(
        <Link href="/">
            <div className="items-center hidden lg:flex">
                <Image src="/HuntyBudget_Logo.png" height={28} width={200} alt="HuntyBudget"/>
                <p className="font-semibold text-white text-2xl ml-2.5">
                </p>
            </div>
        </Link>
    );
};