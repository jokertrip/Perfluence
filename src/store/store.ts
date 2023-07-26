import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {combineReducers, configureStore} from '@reduxjs/toolkit'

import weatherReducer from './slices/weather/reducer'

const rootReducer = combineReducers({
	weather: weatherReducer,
})

export const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
