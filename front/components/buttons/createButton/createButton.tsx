"use client"

import classes from "./createButton.module.sass"


export default function CreateButton({ onClick}: {onClick: () => void}) {

	return (
		<button className={classes.createButton}>
			Создать галерею
		</button>
	)
}
