import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

const Member = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }
  return (
    <div>
      <h1>Member Server Session</h1>
      <div>{}</div>
      <div>{session?.user?.email}</div>
      <div>{session?.user?.role}</div>
    </div>
  );
};

export default Member;
