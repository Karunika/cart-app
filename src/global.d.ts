export interface I_Cart {
    _id: string;
    name: string;
    dateCreated: number;
    lastModified: number;
    budget: number;
    itemsSeq: string[];
    items: { [key: string]: I_Item };
}

export interface I_Item {
    _id: string;
    name: string;
    cost: number;
    quantity: number;
    dateAdded: number;
}
import { Instance } from 'tippy.js';
