import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './index';

/**
 * A custom version of Redux's useDispatch.
 * Use this in your components instead of plain useDispatch so TypeScript
 * automatically knows about our app's specific actions.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * A custom version of Redux's useSelector.
 * Use this in your components instead of plain useSelector so TypeScript
 * automatically knows all the data that is inside our Redux store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
