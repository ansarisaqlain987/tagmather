'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModalState } from "@/hooks/useModalState";
import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { AwaitedReactNode, FC, JSXElementConstructor, Key, PropsWithChildren, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { AddOrUpdateEnvelopModal } from "./addOrUpdateEnvelopModal";
import { fetchCall } from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import { UserEnvelopsWithTotal } from "@/app/types";
import { useGetEnvelopsData } from "@/queries/useGetEnvelopsData";
import { ScrollArea } from "@/components/ui/scroll-area"
import { DataTable } from "@/components/DataTable";
import { getColumnDefinition } from "./columns";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DeleteProps {
    open: boolean;
    onOpenChange: (val: boolean) => void;
    onSubmitClick: (id: number) => void;
    data?: Pick<UserEnvelopsWithTotal, 'id' | 'name'> | null;
}
const DeleteModal: FC<DeleteProps> = ({open, onOpenChange, data, onSubmitClick}) => {
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <div className="flex flex-col gap-4">
                    <div>Delete <span className="italic font-bold">`{data?.name}`</span> envelop?</div>
                    <div className="flex gap-2 justify-end">
                        <Button variant={"secondary"} onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button variant={"destructive"} onClick={() => onSubmitClick(data?.id ?? 0)}>Confirm</Button>
                        </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

interface Props {
    enableViewALlButton?: boolean;
    createOrUpdateEnvelopAction: (data: any, id?: number) => void;
    deleteEnvelop: (id: number) => void;
}
export const EnvelopTable: FC<PropsWithChildren<Props>> = ({ enableViewALlButton, createOrUpdateEnvelopAction, deleteEnvelop }) => {
    const { isOpen, updateModalState, openModal } = useModalState();
    const { isOpen: isOpenDelete, updateModalState: updateModalStateDelete, openModal: openModalDelete } = useModalState();
    const { data, refetch, isLoading } = useGetEnvelopsData<UserEnvelopsWithTotal[]>();
    const createOrUpdateEnvelop = async (data: any, id?: number) => {
        await createOrUpdateEnvelopAction(data, id);
        refetch();
    }
    const [selectedData, setSelectedData] = useState<Pick<UserEnvelopsWithTotal, 'name' | 'id' | 'description'> | null>(null);
    const onEditClick = (data: Pick<UserEnvelopsWithTotal, 'name' | 'id' | 'description'>) => {
        setSelectedData(data);
        openModal();
    }

    const onDeleteClick = (data: Pick<UserEnvelopsWithTotal, 'name' | 'id' | 'description'>) => {
        setSelectedData(data);
        openModalDelete();
    }

    const onDeleteButtonCLick = async (id: number) => {
        await deleteEnvelop(id);
        updateModalStateDelete(false);
        refetch();
    }
    const columns = getColumnDefinition(onEditClick, onDeleteClick)
    return (
        <Card x-chunk="dashboard-01-chunk-5" className="h-[100%] flex flex-col">
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
            <ScrollArea className="h-[65vh] pb-6" >
                <CardContent className="h-[65vh] grid gap-6 ">
                    <DataTable columns={columns} data={data as UserEnvelopsWithTotal[]} loading={isLoading}/>
                </CardContent>
            </ScrollArea>
            <AddOrUpdateEnvelopModal open={isOpen} onOpenChange={updateModalState} onSubmitClick={createOrUpdateEnvelop} data={selectedData ?? undefined}/>
            <DeleteModal open={isOpenDelete} onOpenChange={updateModalStateDelete} onSubmitClick={onDeleteButtonCLick} data={selectedData}/>
        </Card>
    )
}