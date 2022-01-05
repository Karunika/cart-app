import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useEffect } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useUnloadCautionPrompt = (criteria: boolean) =>
    useEffect(() => {
        const unloadHandler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = ``;
            return ``;
        };
        if (criteria) window.addEventListener(`beforeunload`, unloadHandler);
        return () => {
            window.removeEventListener(`beforeunload`, unloadHandler);
        };
    });
