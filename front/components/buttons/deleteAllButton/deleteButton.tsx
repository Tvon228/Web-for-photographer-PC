"use client"

import Image from "next/image"
import deletelistIcon from "@/public/icons/deletelist.png"

import classes from "./deleteButton.module.sass"

export default function DeletelistButton() {

	return (
		<button className={classes.deleteButton}>
            <Image
				src={deletelistIcon}
				alt="delete list gallery"
				className={classes.controlIcon}
			/>
			Выделить объекты
		</button>
	)
}
