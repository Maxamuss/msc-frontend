import { createSlice } from '@reduxjs/toolkit';
import Model from '../core/models/model';
import { IModel } from '../core/models/types';

interface ISet {
    models: IModel[];
}

export const applicationSlice = createSlice({
    name: 'models',
    initialState: {
        definition: 0,
        models: []
    },
    reducers: {
        setApplication: (state, action) => {
            state.definition = action.payload;

            let models: any = [];

            action.payload.models.map((model: IModel) => {
                models.push(new Model(model));
            })

            state.models = models;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setApplication } = applicationSlice.actions

export default applicationSlice.reducer