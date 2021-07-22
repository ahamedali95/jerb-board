import { createSlice } from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

//Allow me to introduce redux-toolkit which is an opinionated redux library that includes all the procedure
//for fast and efficient Redux development. Please checkout my blog on this topic: https://ahamedblogs.wordpress.com/2020/09/24/writing-redux-logic-efficiently-with-redux-toolkit/
const initialState = {
    currentListing: null
};

const listingStatus = createSlice( {
    name: 'listingStatus',
    initialState: initialState,
    reducers: {
        currentListing(state, action: PayloadAction<string | null>) {
            state.currentListing = action.payload;
        }
    }
});

export const { currentListing } = listingStatus.actions;
export default listingStatus.reducer;