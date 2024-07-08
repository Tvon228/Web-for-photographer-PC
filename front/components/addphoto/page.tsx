"use client"

import useAddPhotoModal from "@/hooks/useAddPhoto.hook"
import classes from "./photo.module.sass"

import Image from "next/image"
import closeIcon from "@/public/icons/close.png"

import { useEffect, useRef } from "react"

export default function Edit() {
	const containerRef = useRef<HTMLDivElement>(null)
	const [openAddPhotoModal, _, closeAddPhotoModal] = useAddPhotoModal()

	useEffect(() => {
		if (openAddPhotoModal) {
			containerRef.current.style.removeProperty("z-index")
		} else {
			setTimeout(() => {
				containerRef.current.style.zIndex = "-1"
			}, 300)
		}
	}, [openAddPhotoModal])

	return (
		<div
			ref={containerRef}
			className={
				classes.container +
				" " +
				(!openAddPhotoModal && classes.containerHidden)
			}
		>
			<div className={classes.content}>
				<div className={classes.main}>
					<div className={classes.label}>Загрузка фотографий</div>
					<div ref={containerRef}>
						<Image
							src={closeIcon}
							alt="close"
							className={classes.controlIcon}
							onClick={closeAddPhotoModal}
						/>
					</div>
					<div className={classes.form}>
						<div className={classes.form_label}>Вручную</div>
						<div className={classes.form_label}>Zip-архив</div>
					</div>
				</div>
			</div>
		</div>
	)
}
