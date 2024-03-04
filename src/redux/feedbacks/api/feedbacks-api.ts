import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_PATH } from "@utils/const/api";
import { FeedbackType } from "../types";
import { RootState } from "@redux/configure-store";

export const feedbacksApi = createApi({
    reducerPath: 'feedbacksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_PATH,
        prepareHeaders: (headers, {getState} ) => {
                const token = (getState() as RootState).auth.token || localStorage.getItem('user');
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
                return headers
            }
    }),
    endpoints: (builder) => ({
        getFeedbacks: builder.query<FeedbackType[], object>({
            query: () => 'feedback',
        }),
        createFeedback: builder.mutation({
            query: (body: {rating: number, message: string}) => ({
                url: 'feedback',
                method: 'post',
                body,
                credentials: 'include'
            })
        })
    })
})

export const {useGetFeedbacksQuery, useCreateFeedbackMutation} = feedbacksApi