import { createSlice } from '@reduxjs/toolkit';

export const releaseSlice = createSlice({
    name: 'release',
    initialState: {
        release: null,
        changeCount: null,
    },
    reducers: {
        setReleaseData: (state, action) => {
            state.release = action.payload.release;
            state.changeCount = action.payload.release_change_count;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setReleaseData } = releaseSlice.actions

export default releaseSlice.reducer