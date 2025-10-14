import { NextResponse } from "next/server";
import User from "../../(models)/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;

    //confirm user actually typed sth
    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    console.log("Created user:", userData);
    return NextResponse.json({ message: "User Created successfully" }, { status: 201 });
    //or

    // if (!userData || Object.keys(userData).length === 0) {
    //     return NextResponse.json({ message: "No user data provided" }, { status: 400 })
    // }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
