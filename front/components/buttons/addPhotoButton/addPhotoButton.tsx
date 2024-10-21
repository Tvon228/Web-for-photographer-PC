"use client"

import Image from "next/image"
import addIcon from "@/public/icons/addgallery.png"

import classes from "./addPhoto.module.sass"
import useFormModal from "@/hooks/FormModal/useFormModal.hook"

export default function AddPhotoButton() {
	const {openFormModalAction}= useFormModal()

	return (
		<button className={classes.addButton} onClick={openFormModalAction}>
			<Image
				src={addIcon}
				alt="add_photo"
				className={classes.controlIcon}
			/>
			Добавить фотографии
		</button>
	)
}

