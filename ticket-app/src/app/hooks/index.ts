import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'

// Кастомный хук для получения типа состояния
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Кастомный хук для получения типа диспетчера
export const useAppDispatch = () => useDispatch<AppDispatch>()
