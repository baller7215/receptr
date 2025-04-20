import axios from 'axios';
import Constants from 'expo-constants';
import { Item } from '@/types/types';

export const fetchItemsApi = async (): Promise<Item[]> => {
    const apiUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL;
    console.log('fetchItemsApi URL →', apiUrl, '/items/');
    
    try {
        console.log('fetching items');
        const response = await axios.get<Item[]>(`${apiUrl}/items/`);
        console.log('items:', response.data);

        return response.data.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    } catch (err) {
        console.error('fetchItemsApi error', err);
        throw err;
    }
    
}