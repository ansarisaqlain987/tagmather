import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next"

export const getSampleAction = async () => {
    'use server';
    const session = await getServerSession(authOptions);
    const x = await prisma.envelope.findMany({where: {user: session?.user?.email ?? ''}});
    console.log('data:', x);
}