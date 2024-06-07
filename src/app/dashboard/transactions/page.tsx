
import { Column, TransactionTable } from "./transactionTable";

export default async function Trans() {

    const columns: Column[] = [
        {
            name: 'Type',
        },
        {
            name: 'Amount',
        },
        {
            name: 'Description',
        },
        {
            name: 'CreatedAt',
        },
        {
            name: 'UpdatedAt',
            direction: 'right'
        },
    ]
    return (
        <TransactionTable columns={columns} transactions={[]} envelops={[]} />
    )
}