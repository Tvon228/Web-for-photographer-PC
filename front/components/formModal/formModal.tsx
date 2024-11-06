"use client"

import classes from "./formModal.module.sass"

import { useRef, useEffect, useState } from "react"

import PhotoPage from "./photopage/photoPage" 
import FilePage from "./filePage/filePage" 

import useFormModal from "@/hooks/FormModal/useFormModal.hook"

import { cssIf } from "@/utils/utils"

interface FormModalProps{
	galleryId: number
}

export default function FormModal({galleryId} : FormModalProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	const [activeTab, setActiveTab] = useState("photo")

	const {opened} = useFormModal()
	
	useEffect(() => {
		if (containerRef.current) {
			if (opened) {
				containerRef.current.style.removeProperty("z-index")
			} else {
				setTimeout(() => {
					// @ts-ignore
					containerRef.current.style.zIndex = "-1"
				}, 200)
			}
		}
	}, [opened])

	const isPhotoTab = activeTab == "photo"
	const isArchiveTab = activeTab == "archive"

	return (
		<div
			ref={containerRef}
			className={cssIf(opened, classes.container, classes.containerHidden)}
		>
			<div className={classes.content}>
				<div className={classes.header}>
					<span
						className={cssIf(isPhotoTab, classes.activeTab, classes.inactiveTab)}
						onClick={() => setActiveTab("photo")}
					>
						Фото
					</span>
					<span
						className={cssIf(isArchiveTab, classes.activeTab, classes.inactiveTab)}
						onClick={() => setActiveTab("archive")}
					>
						Архив
					</span>
				</div>

				<div className={classes.main}>
					{activeTab == "photo" 
						? 
						<PhotoPage galleryId={galleryId}/> 
						: 
						<FilePage galleryId={galleryId}/>
					}
				</div>
			</div>
		</div>
	)
}
