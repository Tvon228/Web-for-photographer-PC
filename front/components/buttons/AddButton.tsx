"use client"

import classes from "./Button.module.sass"

import { useRouter } from "next/navigation"

export default function AddButton() {
	const router = useRouter()

	const handleClick = () => {
		router.push("./gallery/add")
	}

	return (
		<button onClick={handleClick} className={classes.addButton}>
			Добавить галерею
		</button>
	)
}
