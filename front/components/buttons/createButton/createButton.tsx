"use client"

import { useDispatch } from "react-redux"
import classes from "./createButton.module.sass"
import { AddCards, DeleteCards } from "@/src/slice/cards"


export default function CreateButton({ onClick}: {onClick: () => void}) {

	const dispatch = useDispatch()

	const handleRemoveCard = (cardId: any) => {
		dispatch(AddCards(cardId))
	}

	return (
		<button onClick={onClick} className={classes.createButton}>
			Создать галерею
		</button>
	)
}
