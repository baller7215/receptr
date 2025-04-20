import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import {
    addItem,
    removeItem,
    updateItem,
    setItems,
    Item,
} from './itemsSlice';

export function useItems() {
    const items = useSelector((s: RootState) => s.items.items)
    const dispatch = useDispatch<AppDispatch>()

    const addItemByItem = (item: Item) => dispatch(addItem(item))
    const removeItemById = (id: string) => dispatch(removeItem(id))
    const updateItemByItem = (item: Item) => dispatch(updateItem(item))
    const loadItems = (all: Item[]) => dispatch(setItems(all))

    return { items, addItemByItem, removeItemById, updateItemByItem, loadItems }
}