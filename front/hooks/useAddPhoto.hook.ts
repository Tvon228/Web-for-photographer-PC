import { closeAddPhotoModal, openAddPhotoModal } from "@/src/slice/addphoto"
import { RootState } from "@/src/store"
import { useDispatch, useSelector } from "react-redux"

export default function useAddPhotoModal(): [boolean, () => void, () => void]{

    const dispatch = useDispatch()
    const addphotoOpened = useSelector((state: RootState) => state.addphoto)

    const openAddPhotoModalAction = () => {
        dispatch(openAddPhotoModal())
    }

    const closeAddPhotoModalAction = () => {
        dispatch(closeAddPhotoModal())
    }

    return [addphotoOpened.opened, openAddPhotoModalAction, closeAddPhotoModalAction]
}