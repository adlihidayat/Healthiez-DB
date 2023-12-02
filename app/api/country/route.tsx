import { PrismaClient, Roles } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const getFoods = await prisma.country.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(getFoods, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
};
