"use client";

import Edit from "@/components/addphoto/page";
import EditModal from "@/components/editModal/editModal";
import Viewer from "@/components/modalblock/modal-viewer"

export default function Base() {

  return (
        <>
          <Viewer/>
          <EditModal/>
        </>
  )
}