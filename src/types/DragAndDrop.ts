interface DragItem {
    index: number;
    id: string;
    type: string;
}

export const ItemTypes = {
  CARD: 'card',
  BOOK: 'book'
};

export type {
  DragItem
}
