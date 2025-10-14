import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

const Member = async () => {
  const session = await getServerSession(options);
 
  return (
    <div>
      <h1>Member Server Session</h1>
      <div>{}</div>
     
    </div>
  );
};

export default Member;
