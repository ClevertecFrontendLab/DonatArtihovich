import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
    email: string | null,
    password: string | null,
    token: string | null
}

const initialState: IUserState = {
    email: null,
    password: null,
    token: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserToken: (state, action: PayloadAction<{token: string}>) => {
            state.token = action.payload.token
        },
        setUserEmail: (state, action: PayloadAction<{email: string}>) => {
            state.email = action.payload.email
        }
    }
})

export const { setUserToken, setUserEmail } = userSlice.actions