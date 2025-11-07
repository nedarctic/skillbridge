import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full dark:bg-black px-6 md:px-10 border-t border-zinc-200 bg-zinc-50">
      {/* Top section */}
      <div className="flex flex-col md:flex-row justify-between gap-8 py-8">
        {/* Main Menu */}
        <div className="text-center md:text-left">
          <p className="font-sans text-black dark:text-white text-lg font-bold mb-2">
            Main Menu
          </p>
          <ul className="space-y-1">
            <li><Link href={"/"} className="font-sans text-black dark:text-white text-base font-medium hover:underline cursor-pointer">Home</Link></li>
            <li><Link href={"/about"} className="font-sans text-black dark:text-white text-base font-medium hover:underline cursor-pointer">About</Link></li>
            <li><Link href={"/explore"} className="font-sans text-black dark:text-white text-base font-medium hover:underline cursor-pointer">Explore</Link></li>
            <li><Link href={"/contact"} className="font-sans text-black dark:text-white text-base font-medium hover:underline cursor-pointer">Contact</Link></li>
          </ul>
        </div>

        {/* Slogan */}
        <div className="text-center md:text-left">
          <p className="font-sans text-black dark:text-white text-3xl font-medium">
            No Money.
          </p>
          <p className="font-sans text-black dark:text-white text-3xl font-medium">
            Just Skills.
          </p>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left">
          <p className="font-sans text-black dark:text-white text-lg font-bold mb-2">
            Contact
          </p>
          <ul className="space-y-1">
            <li className="font-sans text-black dark:text-white text-base font-medium hover:underline cursor-pointer">Instagram</li>
            <li className="font-sans text-black dark:text-white text-base font-medium hover:underline cursor-pointer">Facebook</li>
            <li className="font-sans text-black dark:text-white text-base font-medium hover:underline cursor-pointer">X (Twitter)</li>
          </ul>
        </div>
      </div>

      {/* Center logo / title */}
      <div className="flex justify-center items-center py-6">
        <p className="text-4xl sm:text-6xl md:text-8xl text-black dark:text-white font-extrabold tracking-wide">
          SKILLBRIDGE
        </p>
      </div>

      {/* Bottom copyright */}
      <div className="text-center font-sans text-xs sm:text-sm text-black dark:text-white border-t dark:border-zinc-800 py-4">
        &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
      </div>
    </footer>
  );
};
