import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(){
    const testData = await prisma.test_data.findMany()
    return NextResponse.json(testData)
}

export async function POST(request){
    try {
        const data = await request.json()

        if(!data || !data.title || !data.description){
            return NextResponse.json({error: "Invalid Data"}, {status: 400});
        }

        const newTestData = await prisma.test_data.create({
            data: {
                title: data.title,
                description: data.description,
            }
        });

        return NextResponse.json(newTestData, {status: 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}

export async function DELETE(request){
    try {
        const url = new URL(request.url)
        const id = url.searchParams.get('id')

        if(!id){
            return NextResponse.json({error: "ID is required"}, {status: 400})
        }

        const deletedTestData = await prisma.test_data.delete({
            where: {id: Number(id)},
        })

        return NextResponse.json(deletedTestData, {status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}