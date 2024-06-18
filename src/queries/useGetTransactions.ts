import { Transactions } from '@/generated/client';
import { fetchCall } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

export const useGetTransactions = () => {
    return useQuery({queryKey: ['envelops'], queryFn: async () => {
        const res = await fetchCall("api/v1/transactions", {});
        if(!res.ok){
            return []
        }
        const d = await res.json();
        return d.data as Transactions[];
    }})
}