import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import InvoiceModel from "@/models/invoice.model";
import { NextRequest, NextResponse } from "next/server";

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

    const {
      invoice_no,
      invoice_date,
      due_date,
      currency,
      from,
      to,
      items,
      sub_total,
      discount,
      tax_percentage,
      total,
      notes,
    } = await request.json();

    const payload = {
      invoice_no,
      invoice_date,
      due_date,
      currency: currency ?? "USD",
      from,
      to,
      items,
      sub_total,
      discount,
      tax_percentage,
      total,
      notes,
      status: "UNPAID",
      userId: session.user.id,
    };
await connectDB();
    const data = await InvoiceModel.create(payload);

    return NextResponse.json({
      message: "Invoice create Successfully ",
      data: data,
    });
    
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error || error.message || "Erreur interne du serveur",
      },
      {
        status: 500,
      }
    );
  }
}
