import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './index';

/**
 * Typed wrapper around Redux's `useDispatch`.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed wrapper around Redux's `useSelector`.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
