import { Transactions } from '@/generated/client';
import { fetchCall } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

export const useGetEnvelopWithTransactions = () => {
    return useQuery({queryKey: ['envelopsWithTransactions'], queryFn: async () => {
        const res = await fetchCall("api/v1/envelopWithTransactions", {});
        if(!res.ok){
            return []
        }
        const d = await res.json();
        return d.data;
    }})
}