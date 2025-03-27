import Link from "next/link";
import React from "react";
import { ModeToggle } from "./theme-toggle";
import { BrainCog } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/auth.actions";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-16 px-24 border-b">
      <div>
        <Link href="/">
          <BrainCog size={40} />
        </Link>
      </div>
      <div className="flex flex-row gap-3">
        <ModeToggle />
        <form action={signOut}>
          <Button className="cursor-pointer">Signout</Button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
