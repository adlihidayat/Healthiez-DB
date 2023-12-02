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
    })

    
    return NextResponse.json(getFoods, {status : 200});
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
    
  }finally{
    prisma.$disconnect(); 
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const createdIngredient = await prisma.ingredient.create({
      data: {
        items: body.items,        
        additionalItems : body.additionalItems,
      },
    });

    const newFood = await prisma.food.create({
      data: {
        name: body.name, 
        img: body.img,        
        typeId: body.typeId,    
        countryId: body.countryId,      
        ingredientId: createdIngredient.id,
        rating: body.rating,    
        desc: body.desc,       
        howToCook: body.howToCook, 
        video: body.video,  
      },
    });

    return NextResponse.json(newFood, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    
  }finally{
    prisma.$disconnect(); 
  }
}
