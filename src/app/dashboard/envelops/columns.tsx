'use client';
import { ColumnDef } from "@tanstack/react-table";
import { UserEnvelopsWithTotal } from "@/app/types";

export const columns: ColumnDef<UserEnvelopsWithTotal>[] = [
    {
        accessorKey: "id",
        header: "Id",
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
        header: "Amount",
    },
]