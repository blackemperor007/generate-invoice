import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import SettingModel from "@/models/Settings.model";
import { User } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";


// Creation et modification
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          message: "Pas autorisé",
        },
        {
          status: 401,
        }
      );
    }

    const { logo, signature } = await request.json();

    await connectDB();

    const setting = await SettingModel.findOne({ userId: session.user.id });

    const payload = {
      userId: session.user.id,
      ...(logo && { invoiceLogo: logo }),
      ...(signature && { signature: signature }),
    };

    // modifier le document
    if (setting) {
      const updateSetting = await SettingModel.findByIdAndUpdate(
        setting._id,
        payload
      );
      return NextResponse.json(
        {
          message: "Paramètres mis à jour avec succès",
          // data: updateSetting
        },
        {
          status: 200,
        }
      );
    }

    // créer le document
    const createSetting = await SettingModel.create(payload);
    return NextResponse.json(
      {
        message: "Paramètres enregistrés avec succès",
        // data: createSetting
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error || error.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

// Récupération des paramètres
export async function GET(request: NextRequest) {
    try {
        const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          message: "Pas autorisé",
        },
        {
          status: 401,
        }
      );
    }

    const getData = await SettingModel.findOne({ userId: session.user.id });

    return NextResponse.json(
      {
        message: "Succès",
        data: getData,
      },
      {
        status: 200,
      }
    );
    } catch (error : any) {
        return NextResponse.json(
      {
        message: error || error.message ||"Erreur interne du serveur",
      },
      {
        status: 500,
      }
    );
    }
}
