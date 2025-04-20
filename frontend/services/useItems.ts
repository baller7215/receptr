import { useQuery } from '@tanstack/react-query';
import { fetchItemsApi } from './items';
import { Item } from '@/types/types';

export const useGetItems = () =>
    useQuery<Item[], Error>({
        queryKey: ['items'],
        queryFn: fetchItemsApi,
        staleTime: 5 * 60_000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })