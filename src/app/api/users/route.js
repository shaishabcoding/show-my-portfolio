import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoDb";
import UserModel from "@/models/UserModels";

// Named export for GET requests
export async function GET() {
  await dbConnect();

  try {
    const documents = await UserModel.find({});
    return NextResponse.json({ success: true, data: documents });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Named export for POST requests
export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json(); // Parse the JSON body
    const document = await UserModel.create(body);
    return NextResponse.json(
      { success: true, data: document },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
