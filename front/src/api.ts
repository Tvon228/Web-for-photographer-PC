import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Gallery } from "@/types/entity.types"
import { ApiResponse } from "@/types/api.types"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
    tagTypes: ["Gallery"],
    endpoints: (builder) => ({
        getGalleries: builder.query<ApiResponse<Gallery[]>, void>({
            query: () => "/galleries",
            providesTags: [{type: "Gallery", id: "ALL"}]
        }),
        createGallery: builder.mutation<ApiResponse<Gallery>, Gallery>({
            query: (gallery: Gallery) => ({
                url: "/galleries",
                body: gallery,
                method: "POST"
            }),
            invalidatesTags: [{type: "Gallery", id: "ALL"}]
        })
    })
})
export const {
    useGetGalleriesQuery,
    useCreateGalleryMutation
} = api