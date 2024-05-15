"use client"

import useModal from "@/hooks/useModal.hook"
import classes from "./Button.module.sass"

export default function AddButton() {
	
	const [_, openModal] = useModal()


	return (
		<button onClick={openModal} className={classes.addButton}>
			Добавить галерею
		</button>
	)
}
