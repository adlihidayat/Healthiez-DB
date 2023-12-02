
import { PrismaClient, Roles } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async () => {
  
    try {
      const getFoods = await prisma.food.findMany({
        select: {
          id: true,
          name: true,
          img: true,
          type: {
            select: {
              name:true,
            },
          },
          country: {
            select: {
              name:true,
            },
          },
          rating: true,
          desc: true,
          ingredient: {
            select: {
              items:true,
              additionalItems: true,
            },
          },
          howToCook: true,
          video: true,
        },
      });
      return NextResponse.json(getFoods, {status : 200});
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      
    }finally{
      prisma.$disconnect(); 
    }
  };