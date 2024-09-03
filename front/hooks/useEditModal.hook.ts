import { closeEditModal, openEditModal } from "@/src/slice/editModal"
import { RootState } from "@/src/store"
import { useDispatch, useSelector } from "react-redux"

export default function useEditModal(): [boolean, () => void, () => void] {

    const dispatch = useDispatch()
    const editModal = useSelector((state: RootState) => state.editModal)

    const openEditModalAction = () => {
        dispatch(openEditModal())
    }

    const closeEditModalAction = () => {
        dispatch(closeEditModal())
    }

    return [editModal.opened, openEditModalAction, closeEditModalAction]
}