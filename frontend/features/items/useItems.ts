import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import {
    addItem,
    removeItem,
    updateItem,
    setItems,
} from './itemsSlice';
import { Item } from '@/types/types';

export function useItems() {
    const items = useSelector((s: RootState) => s.items.items)
    const dispatch = useDispatch<AppDispatch>()

    const addItemByItem = (item: Item) => dispatch(addItem(item))
    const removeItemById = (id: number) => dispatch(removeItem(id))
    const updateItemByItem = (item: Item) => dispatch(updateItem(item))
    const loadItems = (all: Item[]) => dispatch(setItems(all))

    return { items, addItemByItem, removeItemById, updateItemByItem, loadItems }
}