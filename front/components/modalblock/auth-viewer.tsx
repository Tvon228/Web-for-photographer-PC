import { useAppSelector } from "@/src/store"
import  Gallery from "@/components/modalblock/setviewmodal/page"
import  AddGalleryModal from "@/components/modalblock/viewmodal/modal"

export default function AuthViewer() {
  return (
    <>
        <Gallery/>
        <AddGalleryModal />
    </>
  )
}