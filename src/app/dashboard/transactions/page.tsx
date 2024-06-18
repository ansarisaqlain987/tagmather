
import { TableWithActions } from "@/components/TableWithActions";
import { Transactions } from "@/generated/client";
import { TransactionTable } from "./transactionTable";

export default async function Trans() {
    const data: Transactions[] = [];
    return (
        <TransactionTable columns={[]} transactions={[]} envelops={[]} />
    )
}