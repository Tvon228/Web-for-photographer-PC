import { closeEditModal, openEditModal } from "@/src/slice/editModal"
import { RootState } from "@/src/store"
import { Gallery } from "@/types/entity.types"
import { useDispatch, useSelector } from "react-redux"

export default function useEditModal(): [
	boolean,
	(galleryData: Gallery) => void,
	() => void
] {
	const dispatch = useDispatch()
	const editModal = useSelector((state: RootState) => state.editModal)

	const openEditModalAction = (galleryData: Gallery) => {
		dispatch(openEditModal(galleryData)) 
	}

	const closeEditModalAction = () => {
		dispatch(closeEditModal())
	}

	return [editModal.opened, openEditModalAction, closeEditModalAction]
}
