// pages/api/check-name.js
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const existingUser = await prisma.user.findUnique({
      where: { name: body.name },
    });

    if (existingUser) {
      return NextResponse.json({ available: true });
    } else {
      return NextResponse.json({ available: false });
    }
  } catch (error) {
    console.error("Error checking name availability:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}
