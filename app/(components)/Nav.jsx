import Link from "next/link";
import React from "react";

const Nav = () => {
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
        </div>
      </nav>
    </header>
  );
};

export default Nav;
