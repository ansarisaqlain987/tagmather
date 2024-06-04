'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModalState } from "@/hooks/useModalState";
import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { AwaitedReactNode, FC, JSXElementConstructor, Key, PropsWithChildren, ReactElement, ReactNode, ReactPortal } from "react";
import { AddOrUpdateEnvelopModal } from "./addOrUpdateEnvelopModal";
import { fetchCall } from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import { UserEnvelopsWithTotal } from "@/app/types";
import { useGetEnvelopsData } from "@/queries/useGetEnvelopsData";

interface Props {
    enableViewALlButton?: boolean;
    createOrUpdateEnvelopAction: (data: any, id?: number) => void;
}
export const EnvelopTable: FC<PropsWithChildren<Props>> = ({ enableViewALlButton, createOrUpdateEnvelopAction }) => {
    const { isOpen, updateModalState, openModal } = useModalState();
    const {data, refetch} = useGetEnvelopsData()
    const createOrUpdateEnvelop = async (data: any, id?: number) => {
        await createOrUpdateEnvelopAction(data, id);
        refetch();
    }
    return (
        <>
            <Card x-chunk="dashboard-01-chunk-5" className="h-full">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Envelops</CardTitle>
                    </div>
                    <div className="w-[100%] flex justify-end gap-3">
                        <Button asChild size="sm" onClick={() => openModal()}>
                            <div>
                                <Plus className="h-4 w-4" />
                            </div>
                        </Button>
                        {enableViewALlButton && (<Button asChild size="sm">
                            <Link href="/dashboard/envelops">
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>)}
                    </div>
                </CardHeader>
                <CardContent className="grid gap-8">
                    {
                        data?.map((e: UserEnvelopsWithTotal) => (
                            <div key={e.id} className="flex items-center gap-4">
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        {e.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {e.description}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+${e.amount}</div>
                            </div>
                        ))
                    }

                </CardContent>
            </Card>
            <AddOrUpdateEnvelopModal open={isOpen} onOpenChange={updateModalState} onSubmitClick={createOrUpdateEnvelop} />
        </>
    )
}