import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Constants from 'expo-constants';
import { Item } from '@/types/types';

const apiUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL;

async function postItem(data: Omit<Item, 'id'>): Promise<Item> {
    const response = await axios.post<Item>(`${apiUrl}/items/`, {
        ...data,
        date: data.date.toISOString().split('T')[0],
        price: Number(data.price.toFixed(2)),
    });
    return response.data;
}

async function putItem(id: number, data: Omit<Item, 'id'>): Promise<Item> {
    const response = await axios.put<Item>(
        `${apiUrl}/items/${id}/`,
        {
            ...data,
            date: data.date.toISOString().split('T')[0],
            price: Number(data.price.toFixed(2)),
        }
    );
    return response.data;
}



// hook for adding a new item
export function useAddItemMutation() {
    const queryClient = useQueryClient();
    return useMutation<Item, Error, Omit<Item, 'id'>>({
        mutationFn: postItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] })
        }
    });
}

// hook for updating an existing item
export function useUpdateItemMutation() {
    const queryClient = useQueryClient();
    return useMutation<Item, Error, { id: number; data: Omit<Item, 'id'> }>({
        mutationFn: ({ id, data }) => putItem(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] })
        }
    });
}