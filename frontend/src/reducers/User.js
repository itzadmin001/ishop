import { createSlice } from "@reduxjs/toolkit";


export const UserSlice = createSlice({
    name: 'user',
    initialState: {
       data : null
    },
    reducers: {
        login: (currentState, {payload}) => {
              currentState.data = payload.user
              localStorage.setItem('user', JSON.stringify(payload.user));
        },
        logout: (currentState) => {
            currentState.data = null;
            localStorage.removeItem('user');
        },
        lsToState:(currentState) => {
            const lsUser = JSON.parse(localStorage.getItem('user'));
            currentState.data = lsUser;
        }
    },
})


export const { login , logout ,lsToState} = UserSlice.actions;
export default UserSlice.reducer;