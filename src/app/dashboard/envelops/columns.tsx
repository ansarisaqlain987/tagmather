'use client';
import { ColumnDef } from "@tanstack/react-table";
import { UserEnvelopsWithTotal } from "@/app/types";

export const columns: ColumnDef<UserEnvelopsWithTotal>[] = [
    {
        accessorKey: "name",
        header: "Name",
        sortingFn: 'alphanumeric',
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
        cell: ({row}) => {
            return <div style={{ textAlign: "right" }}>{row.getValue("amount")}</div>
        }
    },
]