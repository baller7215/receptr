export interface Item {
    id?: number;
    item_name: string;
    date: Date;
    price: number;
    description: string;
    quantity: number;
    necessary: boolean;
}

export interface AddItemProps {
    visible: boolean;
    onClose: () => void;
    onItemAdded?: (item: Item) => void;
    item?: Item | null;
}