"use client";

import React from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <div className="max-w-full h-16 flex justify-between items-center">
      <div className="font-bold text-2xl px-10 text-zinc-800">dropit.io</div>
      <div>
        <ol className="flex gap-6 px-10 items-center">
          <li>
            <Link
              href={"/pricing"}
              className={buttonVariants({ variant: "link" })}
            >
              Pricing
            </Link>
          </li>

          <Link
            className={buttonVariants({ variant: "default" })}
            href={"/auth-server-action"}
          >
            Get started
            <ArrowRight className="pl-1" />
          </Link>
        </ol>
      </div>
    </div>
  );
};

export default Navbar;
