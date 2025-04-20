import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Item {
    id: string;
    item_name: string;
    date: Date;
    price: number;
    description: string;
    quantity: number;
    necessary: boolean;
    // category_id
}

interface ItemsState {
    items: Item[]
}

const initialState: ItemsState = { items: [] }

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Item[]>) {
            state.items = action.payload
        },
        addItem(state, action: PayloadAction<Item>) {
            state.items.push(action.payload)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        updateItem(state, action: PayloadAction<Item>) {
            state.items = state.items.filter(item => item.id !== action.payload.id)
            state.items.push(action.payload)
        },
        clearItems(state) {
            state.items = []
        }
    }
})


export const {
    setItems,
    addItem,
    removeItem,
    updateItem,
    clearItems,
} = itemsSlice.actions

export default itemsSlice.reducer