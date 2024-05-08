"use client"

import classes from "./Button.module.sass"

import { setAuthState } from "@/src/authSlice"
import { useAppDispatch } from "@/src/store"

export default function AddButton() {
	
	const dispatch = useAppDispatch()

	return (
		<button onClick={() => dispatch(setAuthState(true))} className={classes.addButton}>
			Добавить галерею
		</button>
	)
}
