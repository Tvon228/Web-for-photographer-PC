"use client"

import EditGalleryModal from "@/components/editModal/editModal"
import Viewer from "@/components/modalblock/modal-viewer"

export default function Base() {
	return (
		<>
			<Viewer />
			<EditGalleryModal/>
		</>
	)
}
