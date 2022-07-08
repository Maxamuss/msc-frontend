import { createSlice } from '@reduxjs/toolkit';

export const releaseSlice = createSlice({
    name: 'release',
    initialState: {
        changeCount: null
    },
    reducers: {
        setChangeCount: (state, action) => {
            state.changeCount = action.payload.release_change_count;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setChangeCount } = releaseSlice.actions

export default releaseSlice.reducer