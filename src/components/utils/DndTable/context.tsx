import { createContext, useContext } from 'react';

export const DndTableContext = createContext<null>(null);

export const useDndTableContext = () => {
    const ctx = useContext(DndTableContext);
    if (!DndTableContext) {
        throw new Error(
            `Dnd Table Compound Component cannot be use outside DndTable Component.`
        );
    }
    return ctx;
};
