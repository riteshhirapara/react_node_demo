import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Users from "@/app/model/Users";

dbConnect();

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = await Users.findOne({ email });
  if (user) {
    if (user.password === password) {
      return NextResponse.json({ status: 200, message: "Success" });
    }
  }
  return NextResponse.json({ status: 401, message: "Unauthorised" });
}
