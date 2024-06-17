import { Envelope } from "@/generated/client"
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";

export const deleteEnvelop = async (id: number) => {
    "use server";
    try {
        const session = await getServerSession(authOptions);
        if(!session?.user?.email){
            throw new Error();
        }

        return await prisma.envelope.delete({
            where: { id: id, user: session.user.email}
        });
    } catch (err) {
        console.log(err);
    }
}