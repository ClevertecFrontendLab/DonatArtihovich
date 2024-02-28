import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_PATH } from "@utils/const/api";
import { FeedbackType } from "../types";
import { RootState } from "@redux/configure-store";

export const feedbacksApi = createApi({
    reducerPath: 'feedbacks',
    baseQuery: fetchBaseQuery({
        baseUrl: API_PATH,
        prepareHeaders: (headers, {getState} ) => {
                const token = (getState() as RootState).auth.token;
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
                return headers
            }
    }),
    endpoints: (builder) => ({
        getFeedbacks: builder.query<FeedbackType[], {}>({
            query: () => 'feedback',
        })
    })
})

export const {useGetFeedbacksQuery} = feedbacksApi