import { closeAddPhotoModal, openAddPhotoModal } from "@/src/slice/addphoto"
import { RootState } from "@/src/store"
import { useDispatch, useSelector } from "react-redux"

export default function useAddPhotoModal(): [boolean, () => void, () => void] {

    const dispatch = useDispatch()
    const modal = useSelector((state: RootState) => state.modal)

    const openAddPhotoModalAction = () => {
        dispatch(openAddPhotoModal())
    }

    const closeAddPhotoModalAction = () => {
        dispatch(closeAddPhotoModal())
    }

    return [modal.opened, openAddPhotoModalAction, closeAddPhotoModalAction]
}