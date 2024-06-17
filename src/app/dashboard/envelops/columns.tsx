'use client';
import { ColumnDef } from "@tanstack/react-table";
import { UserEnvelopsWithTotal } from "@/app/types";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const getColumnDefinition = (onEdit?: (data: Pick<UserEnvelopsWithTotal, 'name' | 'id' | 'description'>) => void, onDelete?: (data: Pick<UserEnvelopsWithTotal, 'name' | 'id' | 'description'>) => void): ColumnDef<UserEnvelopsWithTotal>[] => [
    {
        id: "actions",
        enableHiding: false,
        size: 10, 
        cell: ({ row }) => {
            const payment = row.original;
            return (
                <div className="text-left">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit?.({
                                id: payment.id,
                                name: row.getValue('name'),
                                description: row.getValue('description')
                            })}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete?.({
                                id: payment.id,
                                name: row.getValue('name'),
                                description: row.getValue('description')
                            })}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "amount",
        header: () => {
            return <div style={{ textAlign: "right" }}>Amount</div>
        },
        cell: ({ row }) => {
            return <div style={{ textAlign: "right" }}>{row.getValue("amount")}</div>
        }
    },
]