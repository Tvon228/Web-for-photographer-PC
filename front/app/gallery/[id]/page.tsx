"use client"

import FormModal from "@/components/formModal/formModal"
import Photos from "@/components/photoPage/photoPage"

export default function ViewPhotos({ params }: { params: { id: number } }) {
	const galleryId = params.id

	return (
		<>
			<FormModal galleryId={galleryId} />
			<Photos galleryId={galleryId}/>
		</>
	)
}
