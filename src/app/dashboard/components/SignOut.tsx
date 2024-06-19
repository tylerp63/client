"use client";

import { Button } from "@/components/ui/button";
import { SignOut } from "../actions";
export default function SignOutButton() {
  return (
    <form action={SignOut}>
      <Button type="submit" variant="ghost">
        <h1 className="font-2xl text-zinc-700 font-bold">Sign Out</h1>
      </Button>
    </form>
  );
}
