"use client"

import Image from "next/image"
import addIcon from "@/public/icons/addgallery.png"

import useModal from "@/hooks/useModal.hook"
import classes from "./Button.module.sass"

export default function AddButton() {
	const [_, openModal] = useModal()

	return (
		<button onClick={openModal} className={classes.addButton}>
			<Image
				src={addIcon}
				alt="add gallery"
				className={classes.controlIcon}
			/>
			Добавить галерею
		</button>
	)
}
