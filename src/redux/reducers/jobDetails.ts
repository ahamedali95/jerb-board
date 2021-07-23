import { createSlice } from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {Category, JobPoster, Location} from "../../types";

//Allow me to introduce redux-toolkit which is an opinionated redux library that includes all the procedure
//for fast and efficient Redux development. Please checkout my blog on this topic: https://ahamedblogs.wordpress.com/2020/09/24/writing-redux-logic-efficiently-with-redux-toolkit/

interface AsyncState<T> {
    loading: boolean;
    data: T[];
    error: string;
}

export type InitialState = {
    locations: AsyncState<Location>;
    posters: AsyncState<JobPoster>;
    categories: AsyncState<Category>;
}

const initialState = {
    locations: { loading: false, data: [], error: '' },
    posters: { loading: false, data: [], error: '' },
    categories: { loading: false, data: [], error: '' },
};

interface payload extends AsyncState<{}> {
    property: keyof InitialState;
}

const jobDetails = createSlice( {
    name: 'jobDetails',
    initialState: initialState,
    reducers: {
        // Please note redux-toolkit uses ImmerJS. With the backing of Immer, it is now possible to mutate the
        // state directly inside createReducer and it will internally create immutable copies which forms the new state. very important!
        additionalJobDetails(state: InitialState, action: PayloadAction<payload>) {
            const { payload } = action;
            //@ts-ignore
            state[payload.property] = { loading: payload.loading, data: (payload.data), error: payload.error };
        }
    }
});

export const { additionalJobDetails } = jobDetails.actions;
export default jobDetails.reducer;