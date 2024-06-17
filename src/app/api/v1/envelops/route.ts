
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/db";
import {NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if(!session || !session?.user?.email){
        return NextResponse.json([]);
    }
    const envs =  await prisma.envelope.findMany({where: {user: session.user.email}, orderBy: {id: 'asc'}});
    const data = envs.map(e => ({...e, amount: 0})) 
    return NextResponse.json({data});   
}