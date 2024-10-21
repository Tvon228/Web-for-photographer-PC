"use client"

import Image from "next/image"
import movephoto from "@/public/icons/movephoto.png"

import classes from "./uploadButton.module.sass"

export default function UploadButton() {
	return (
		<button className={classes.uploadButton}>
			<Image
				src={movephoto}
				alt="delete list gallery"
				className={classes.controlIcon}
			/>
			Добавить файлы
		</button>
	)
}
