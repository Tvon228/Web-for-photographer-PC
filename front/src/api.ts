import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Gallery } from "@/types/entity.types"
import { ApiResponse } from "@/types/api.types"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token")
    if (token) {
      headers.set("Authorization", token)
    }
    return headers
  }
})

export const api = createApi({
    reducerPath: "api",
    baseQuery,
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
        }),
        deleteGallery: builder.mutation<void, number>({
            query: (id) => ({
                url: `/galleries/${id}`,
                method: 'DELETE',
            }),
        }),
    })
})
export const {
    useGetGalleriesQuery,
    useCreateGalleryMutation,
    useDeleteGalleryMutation
} = api
