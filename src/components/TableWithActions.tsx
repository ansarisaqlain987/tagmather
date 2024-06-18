'use client';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FC, PropsWithChildren, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { useModalState } from "@/hooks/useModalState";
import { Card, CardHeader, CardTitle } from "./ui/card";


const Modal = () => {

}

interface Props<T> {
    heading: string;
    loading?: boolean;
    data: T[];
    columns: ColumnDef<T>[];
    onEdit?: (data: T) => void;
    onDelete?: { accessor: string, fn: (data: T) => void };
    onAdd?: (data: Partial<T>) => void;
}

export const TableWithActions = <T,>({ data, columns, onDelete, onEdit, loading = false, heading }: Props<T>) => {
    const [selectedData, setSelectedData] = useState<T | undefined>(undefined);
    const { isOpen, updateModalState, openModal } = useModalState();
    const [selectedModal, setSelectedModal] = useState<'edit' | 'delete'>('edit');

    const onEditButtonClick = (data: T) => {
        setSelectedData(data);
        setSelectedModal('edit');
        openModal();
    }

    const onDeleteActionClick = (data: T) => {
        setSelectedData(data);
        setSelectedModal('delete');
        openModal();
    }

    const tableColumns = useMemo(() => {
        const c = columns.filter(c => c?.id !== "actions");
        const actions: { name: string, onClick: Function, accessor?: string }[] = [];
        if (onDelete) {
            actions.push({ name: 'Delete', onClick: onDelete.fn, accessor: onDelete.accessor })
        }

        if (onEdit) {
            actions.push({ name: 'Edit', onClick: onEdit })
        }

        if (actions.length == 0) {
            return c;
        }
        const actionColumn: ColumnDef<T> = {
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
                                {actions.map(ac => {
                                    return <DropdownMenuItem key={ac.name}>{ac.name}</DropdownMenuItem>
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        }

        return [actionColumn, ...c];
    }, [columns, onEdit, onDelete]);

    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <Card
                className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
            >
                <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>{heading}</CardTitle>
                        </div>
                        <div className="w-[100%] flex justify-end gap-3">
                            <Button asChild size="sm" >
                                <div onClick={() => openModal()}>
                                    <Plus className="h-4 w-4" />
                                </div>
                            </Button>
                        </div>
                    </CardHeader>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {!loading && table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}