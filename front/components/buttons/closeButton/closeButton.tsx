"use client"

import classes from "./closeButton.module.sass"


export default function CloseButton({ onClick}: {onClick: () => void}) {

	return (
		<button className={classes.closeButton} onClick={onClick}>
			Закрыть
		</button>
	)
}
