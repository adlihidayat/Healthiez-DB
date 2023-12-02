import { PrismaClient, Roles } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {

    const updateFood = await prisma.food.findUnique({
      where: { 
        id: (params.id) 
      },
      include:{
        type:true,
        country:true,
        ingredient:true,
      }
    });

    return NextResponse.json(updateFood, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error:error}, { status: 500 });
    
  }finally{
    prisma.$disconnect(); 
  }
}
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    const updateFood = await prisma.food.update({
      where: { 
        id: (params.id) 
      },
      data: {
        name: body.name, 
        img: body.img,        
        typeId: body.typeId,    
        countryId: body.countryId,      
        rating: body.rating,    
        desc: body.desc,       
        howToCook: body.howToCook, 
        video: body.video,  
      },
    });

    return NextResponse.json(updateFood, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    
  }finally{
    prisma.$disconnect(); 
  }
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleteFood = await prisma.food.delete({
        where: { id: params.id },
    });

    return NextResponse.json({"status":"delete food done"});
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }); 
  }finally{
    prisma.$disconnect(); 
  }
}