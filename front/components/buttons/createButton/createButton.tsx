"use client"

import classes from "./createButton.module.sass"

import { useRouter } from "next/navigation"

export default function CreateButton() {

	const router = useRouter()

	const handleClick = () => {
		router.push("./")
	}

	return (
		<button onClick={handleClick} className={classes.createButton}>
			Создать галерею
		</button>
	)
}
