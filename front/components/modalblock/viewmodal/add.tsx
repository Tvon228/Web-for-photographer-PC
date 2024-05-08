"use client"

import { useState } from "react"
import { setAuthState } from "@/src/authSlice"
import { useAppDispatch } from "@/src/store"

import Image from "next/image"
import classes from "./add.module.sass"
import closeIcon from "@/public/icons/close.png"
import CreateButton from "@/components/buttons/createButton/createButton"




export default function AddGallary() {

	const dispatch = useAppDispatch()

	return (

		<div className={classes.container}>
			<div className={classes.content}>
					<div>
						<Image
							src={closeIcon}
							alt="close"
							className={classes.controlIcon}
							onClick={() => dispatch(setAuthState(false))}
						/>
					</div>
					<div className={classes.header}>Создание галереи</div>
				<div className={classes.form}>
					<div className={classes.form_item}>
						<div className={classes.form_label}>Название галереи:</div>
						<div className={classes.form_input_container}>
							<input
								type="text"
								className={classes.form_input}
								name="username"
								required
							/>
						</div>
						<div className={classes.form_label}>Пароль к галереи:</div>
						<div className={classes.form_input_container}>
							<input
								type="text"
								className={classes.form_input}
								name="username"
								required
							/>
						</div>
					</div>
					<div className={classes.form_item}>
						<div className={classes.form_label}>
							Сообщение для клиента:
						</div>
						<div className={classes.form_textarea}>
							<textarea/>
						</div>
					</div>
					<div className={classes.form_item}>
						<div className={classes.form_label}>
							<div>
								Комментарий для себя:
							</div>
							<div className={classes.comment}>
								(будет виден в личном кабинете)
							</div>
						</div>
						<div className={classes.form_textarea}>
							<textarea/>
						</div>
					</div>
				</div>
				<CreateButton/>
			</div>
		</div>
	)
}
