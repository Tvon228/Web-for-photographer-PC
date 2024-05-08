"use client";
import ReduxProvider from "@/components/modalblock/redux-provider"
import AuthViewer from "@/components/modalblock/auth-viewer"

export default function Base() {

  return (
    <ReduxProvider>
        <AuthViewer />
    </ReduxProvider>
  )
}