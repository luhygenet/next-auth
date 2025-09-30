import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header className="bg-gray-500 text-gray-100 ">
      <nav className="flex justify-between items-center px-10 py-4">
        <div>My site</div>
        <div className="flex gap-10">
          <Link href="/"> Home</Link>
          <Link href="/CreateUser"> Hey Admin</Link>
          <Link href="/ClientMember"> Client Member</Link>
          <Link href="/Member"> Member</Link>
          <Link href="/Public"> Public</Link>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/"> Log out</Link>
          ) : (
            <Link href="/api/auth/signin"> Log in</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
