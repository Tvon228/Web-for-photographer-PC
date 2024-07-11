"use client";

import Edit from "@/components/addphoto/page";
import Viewer from "@/components/modalblock/modal-viewer"

export default function Base() {

  return (
        <>
          <Viewer/>
          <Edit/>
        </>
  )
}