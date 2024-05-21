
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next"

export const getAllTransactionsAndEnvelops = async () => {
    'use server';
    const session = await getServerSession(authOptions);
    if(!session || !session?.user?.email){
        return [[], []];
    }
    const tPromise = prisma.transactions.findMany({where: {user: session.user.email}});
    const ePromise = prisma.envelope.findMany({where: {user: session.user.email}});
    return await Promise.all([tPromise, ePromise]);
}