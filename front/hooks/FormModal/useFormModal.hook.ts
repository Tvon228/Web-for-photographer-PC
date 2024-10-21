import { closeFormModal, openFormModal } from "@/src/slice/formModal"
import { RootState } from "@/src/store"
import { useDispatch, useSelector } from "react-redux"

export default function useFormModal() {
    const dispatch = useDispatch()
    const formModal = useSelector((state: RootState) => state.formModal)

    const openFormModalAction = () => {
        dispatch(openFormModal())
    }

    const closeFormModalAction = () => {
        dispatch(closeFormModal())
    }

    return { opened: formModal.opened, openFormModalAction, closeFormModalAction}
}