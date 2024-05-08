import { closeModal, openModal } from "@/src/slice/modal"
import { RootState } from "@/src/store"
import { useDispatch, useSelector } from "react-redux"

export default function useModal(): [boolean, () => void, () => void] {

    const dispatch = useDispatch()
    const modal = useSelector((state: RootState) => state.modal)

    const openModalAction = () => {
        dispatch(openModal())
    }

    const closeModalAction = () => {
        dispatch(closeModal())
    }

    return [modal.opened, openModalAction, closeModalAction]
}