import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_PATH} from '@utils/const/api'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_PATH
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body: {email: string, password: string}) => ({
                    url: 'auth/registration',
                    method: 'post',
                    body
                })
            }),
        loginUser: builder.mutation({
            query: (body: {email: string, password: string}) => ({
                    url: 'auth/login',
                    method: 'post',
                    credentials: 'include',
                    body
                })
            }),
        checkEmail: builder.mutation({
            query: (body: {email: string}) => ({
                url: 'auth/check-email',
                method: 'post',
                body
            })
        }),
        confirmEmail: builder.mutation({
            query: (body: {email: string, code: string}) => ({
                url: 'auth/confirm-email',
                method: 'post',
                body
            })
        })
    })
})

export const { 
    useRegisterUserMutation,
    useLoginUserMutation, 
    useCheckEmailMutation,
    useConfirmEmailMutation
} = authApi