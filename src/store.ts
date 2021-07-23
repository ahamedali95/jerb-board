import {configureStore} from '@reduxjs/toolkit';
import reducer from './redux/reducers';
import { useDispatch } from 'react-redux';


const store = configureStore({
    reducer,
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store;