import Link from "next/link";
import React from "react";
import { ModeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-16 px-24">
      <div>
        <Link href="/">MPREP</Link>
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
