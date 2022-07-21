import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        permissions: [],
    },
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload)
            state.user = action.payload;
        },
        setPermissions: (state, action) => {
            state.permissions = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setPermissions } = userSlice.actions

export default userSlice.reducer