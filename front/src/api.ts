import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Gallery, Photo } from "@/types/entity.types"
import { ApiResponse } from "@/types/api.types"

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_API,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem("token")
		if (token) {
			headers.set("Authorization", token)
		}
		return headers
	},
})

export const api = createApi({
	reducerPath: "api",
	baseQuery,
	tagTypes: ["Gallery", "Photo"],
	endpoints: (builder) => ({
		getGalleries: builder.query<ApiResponse<Gallery[]>, void>({
			query: () => "/galleries",
			providesTags: [{ type: "Gallery", id: "ALL" }],
		}),
		createGallery: builder.mutation<ApiResponse<Gallery>, Gallery>({
			query: (gallery: Gallery) => ({
				url: "/galleries",
				body: gallery,
				method: "POST",
			}),
			invalidatesTags: [{ type: "Gallery", id: "ALL" }],
		}),
		updateGallery: builder.mutation<
			ApiResponse<Gallery>,
			{ id: string; gallery: Gallery }
		>({
			query: ({ id, gallery }) => ({
				url: `/galleries/${id}`,
				body: gallery,
				method: "PUT",
			}),
			invalidatesTags: [{ type: "Gallery", id: "ALL" }],
		}),
		deleteGallery: builder.mutation<void, number>({
			query: (id) => ({
				url: `/galleries/${id}`,
				method: "DELETE",
			}),
		}),
		uploadPhoto: builder.mutation<
			ApiResponse<Photo>,
			{ galleryId: number; photo: File }
		>({
			query: ({ galleryId, photo }) => {
				console.log("load to photo to gallery", galleryId)
				const formData = new FormData()
				formData.append("photo", photo)

				return {
					url: `/gallery/${galleryId}/photo`,
					method: "POST",
					body: formData,
				}
			},
			invalidatesTags: [{ type: "Photo", id: "ALL" }],
		}),
	}),
})
export const {
	useGetGalleriesQuery,
	useCreateGalleryMutation,
	useUpdateGalleryMutation,
	useDeleteGalleryMutation,
	useUploadPhotoMutation,
} = api
