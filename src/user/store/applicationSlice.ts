import { createSlice } from '@reduxjs/toolkit';

export const applicationSlice = createSlice({
    name: 'models',
    initialState: {
        models: []
    },
    reducers: {
        setApplication: (state, action) => {
            state.models = action.payload.models;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setApplication } = applicationSlice.actions

export default applicationSlice.reducer