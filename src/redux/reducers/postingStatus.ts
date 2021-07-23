import { createSlice } from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

//Allow me to introduce redux-toolkit which is an opinionated redux library that includes all the procedure
//for fast and efficient Redux development. Please checkout my blog on this topic: https://ahamedblogs.wordpress.com/2020/09/24/writing-redux-logic-efficiently-with-redux-toolkit/
type InitialState = {
    currentPosting: number | null;
}

const initialState = {
    currentPosting: null
};

const postingStatus = createSlice( {
    name: 'postingStatus',
    initialState: initialState,
    reducers: {
        // Please note redux-toolkit uses ImmerJS. With the backing of Immer, it is now possible to mutate the
        // state directly inside createReducer and it will internally create immutable copies which forms the new state.
        currentPosting(state: InitialState, action: PayloadAction<number | null>) {
            state.currentPosting = action.payload;
        }
    }
});

export const { currentPosting } = postingStatus.actions;
export default postingStatus.reducer;