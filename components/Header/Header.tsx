import React from "react";
import { ModeToggle } from "../Theme-toggle/Toggle";
import Image from "next/image";
import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";
import { Button } from "../ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

type link = {
  name: string;
  Link: string;
};

const NavLink: link[] = [
  {
    name: "Home",
    Link: "/",
  },
  {
    name: "Blogs",
    Link: "/blogs",
  },
  {
    name: "About",
    Link: "/about",
  },
];

const Header = () => {
  return (
    <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-[rgb(14,22,48)] border-border/40">
      <div className="container h-14 flex items-center">
        <Link
          href="/"
          className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
        >
          <PanelsTopLeft className="w-6 h-6 mr-3" />
          <span className="font-bold">Dipak Giri</span>
        </Link>
        <nav className="flex gap-2 md:gap-6 ml-auto">
          {NavLink.map((link) => (
            <Link key={link.name} href={link.Link}>
              {link.name}
            </Link>
          ))}
        </nav>
        <nav className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-8 h-8 bg-background"
            asChild
          >
            <Link href="https://github.com/salimi-my/shadcn-ui-sidebar">
              <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
