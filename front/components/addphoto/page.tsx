"use client"

import useAddPhotoModal from "@/hooks/useAddPhoto.hook"
import classes from "./photo.module.sass"

import Image from "next/image"
import closeIcon from "@/public/icons/close.png"

import { useEffect, useRef } from "react"
import AddPhoto from "./secondmodal/addphoto"
import SaveButton from "../buttons/saveButton/saveButton"

export default function Edit() {
	const containersRef = useRef<HTMLDivElement>(null)
	const [openAddPhotoModal, _, closeAddPhotoModal] = useAddPhotoModal()

	useEffect(() => {
		if (containersRef.current) {
			if (openAddPhotoModal) {
				containersRef.current.style.removeProperty("z-index")
			} else {
				setTimeout(() => {
					containersRef.current.style.zIndex = "-1"
				}, 300)
			}
		}
	}, [openAddPhotoModal])

	return (
		<div
			ref={containersRef}
			className={
				classes.container +
				" " +
				(!openAddPhotoModal && classes.containerHidden)
			}
		>
			<div className={classes.content}>
				<div className={classes.main}>
					<div className={classes.label}>Загрузка фотографий</div>
					<div>
						<Image
							src={closeIcon}
							alt="close"
							className={classes.controlIcon}
							onClick={closeAddPhotoModal}
						/>
					</div>
					<div className={classes.form}>
						<div className={classes.withmodal}>
							<div className={classes.form_label}>Вручную</div>
							<AddPhoto />
						</div>
						<div className={classes.withmodal}>
							<div className={classes.form_label}>Zip-архив</div>
							<AddPhoto />
						</div>
					</div>
				</div>
				<div className={classes.save_btn}>
					<SaveButton />
				</div>
			</div>
		</div>
	)
}
