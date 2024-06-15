import { fetchCall } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

export const useGetEnvelopsData = <T = any>() => {
    return useQuery({queryKey: ['envelops'], queryFn: async () => {
        const res = await fetchCall("api/v1/envelops", {});
        if(!res.ok){
            return []
        }
        const d = await res.json();
        return d.data as T;
    }})
}