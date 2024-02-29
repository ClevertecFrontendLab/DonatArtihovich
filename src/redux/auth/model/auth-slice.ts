import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    email: string | null,
    password: string | null,
    token: string | null
}

const initialState: AuthState = {
    email: null,
    password: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserToken: (state, action: PayloadAction<{token: string}>) => {
            state.token = action.payload.token
        },
        setUserEmail: (state, action: PayloadAction<{email: string}>) => {
            state.email = action.payload.email
            console.log('payload: ', action.payload.email)
        },
        setUserPassword: (state, action: PayloadAction<{password: string}>) => {
            state.password = action.payload.password
        }
    }
})

export const { setUserToken, setUserEmail, setUserPassword } = authSlice.actions