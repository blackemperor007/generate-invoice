import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import { Connection } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { firstName, lastName, email } = await request.json();

    const session = await auth();

    if (!session) {
      return new NextResponse("Vous n'êtes pas autorisé", { status: 401 });
    }

    // function connect to db
    await connectDB();
    const userDetails = await UserModel.findByIdAndUpdate(
      session.user?.id,
      {
        firstName,
        lastName,
        currency: "USD",
      });

    return NextResponse.json({
      message: "Détails de l'utilisateur mis à jour avec succès",
      user: userDetails,
    })


  } catch (error: any) {
    return NextResponse.json({
      message: error || error.message || "Une erreur s'est produite lors de la mise à jour des détails de l'utilisateur",
    });
  }
}
