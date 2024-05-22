'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link"
import {
    ArrowUpRight,
    Plus
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";
import { AddOrUpdateTransaction } from "./addAndUpdateTransactionModal";
import { useModalState } from "@/hooks/useModalState";
import { Transactions, Envelope } from "@/generated/client";

export type Column = {
    name: string;
    disable?: boolean;
    direction?: 'right' | 'left';
}

interface TransactionTableProps {
    columns: Column[];
    transactions: Transactions[];
    envelops: Envelope[];
    displayViewAllButton?: boolean;
}
export const TransactionTable: FC<PropsWithChildren<TransactionTableProps>> = ({ columns, displayViewAllButton }) => {
    const { isOpen, updateModalState, openModal } = useModalState();
    const onSubmitClick = async (data: any) => {
        console.log('HELLO ', data)
    }
    const cName = cn("grid gap-4 md:gap-8 lg:grid-cols-1 xl:grid-cols-1", !displayViewAllButton ? "h-[60rem]" : "h-full")
    return (
        <>
            <div className={cName}>
                <Card
                    className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                >
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Transactions</CardTitle>
                            <CardDescription>
                                Recent transactions.
                            </CardDescription>
                        </div>
                        <div className="w-[100%] flex justify-end gap-3">
                            <Button asChild size="sm" >
                                <div onClick={() => openModal()}>
                                    Add
                                    <Plus className="h-4 w-4" />
                                </div>
                            </Button>
                            {
                                displayViewAllButton && (
                                    <Button asChild size="sm">
                                        <Link href="/dashboard/transactions">
                                            View All
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                )
                            }
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {
                                        columns.map((obj, index) => {
                                            const clsNames = cn(
                                                obj.direction ? `text-${obj.direction}` : ''
                                            )
                                            return <TableHead
                                                key={index}
                                                aria-disabled={obj.disable}
                                                className={clsNames}>
                                                {obj.name}
                                            </TableHead>
                                        })
                                    }
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow><TableCell className="w-[10%]">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                    <TableCell className="w-[10%]">
                                        566
                                    </TableCell>
                                    <TableCell className="w-[60%]">
                                        Sale
                                    </TableCell>

                                    <TableCell className="w-[8%]">
                                        2023-06-23
                                    </TableCell>
                                    <TableCell className="text-right w-[8%]">2023-06-23</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <>
                <AddOrUpdateTransaction open={isOpen} onOpenChange={updateModalState} onSubmitClick={onSubmitClick} />
            </>
        </>
    )
}