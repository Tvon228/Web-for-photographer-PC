import { useAppSelector } from "@/src/store"
import  Gallery from "@/components/modalblock/setviewmodal/page"
import  AddGallery from "@/components/modalblock/viewmodal/add"

export default function AuthViewer() {

  const authState = useAppSelector((state) => state.auth.authState)

  return (
    <>
        <Gallery/>
        {authState && <AddGallery/>}
    </>
  )
}