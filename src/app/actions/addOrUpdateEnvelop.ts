import { Envelop } from "@/generated/client"
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { revalidatePath, revalidateTag } from 'next/cache'

export const addOrUpdateEnvelop = async (data: Pick<Envelop, 'description' | 'name'>, id?: number | undefined | null) => {
    "use server";
    try {
        const session = await getServerSession(authOptions);
        if(!session?.user?.email){
            throw new Error();
        }
        const envData: Partial<Envelop> = {
            name: data.name,
            description: data.description,
            updatedAt: new Date(),
        };
        if (id) {
            return await prisma.envelop.update({
                where: {
                    id: id
                },
                data: {
                    ...envData
                }
            })
        }

        return await prisma.envelop.create({
            data: {
                name: data.name,
                description: data.description ?? '',
                updatedAt: new Date(),
                createdAt: new Date(),
                user: session?.user?.email ?? ''
            }
        });
    } catch (err) {
        console.log(err);
    }
}