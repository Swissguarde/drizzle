import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RightContent from "./RightContent";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-3 px-4 md:py-5 md:px-8 border-b border-[#EBEAEA] gap-4">
      <div className="flex items-center justify-start flex-1 gap-10">
        <Link href="/">
          <Image src="/logo.png" width={116} height={43} alt="logo" />
        </Link>

        <ul className="text-sm font-medium hidden gap-7 xl:flex">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div>
        <RightContent />
      </div>
    </nav>
  );
};
export default Navbar;
