
import { Envelope } from "@/generated/client";
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next"

export type UserEnvelopsWithTotal = Envelope & {amount: number};
export const getEnvelops = async (): Promise<UserEnvelopsWithTotal[]> => {
    'use server';
    const session = await getServerSession(authOptions);
    if(!session || !session?.user?.email){
        return [];
    }
    
    const envs =  await prisma.envelope.findMany({where: {user: session.user.email}});
    return envs.map(e => ({...e, amount: 0}))    
}