"use client"

import { useRouter } from "next/navigation"
import classes from "../../styles/page.module.sass"
import { useState } from "react"
import Input from "@/components/Input"

export default function Photograph() {
	const router = useRouter()
	const [state, setState] = useState({
		galleryNumber: "",
		password: "",
	})

	const setGallery = (newGallery: string) => {
		setState({ ...state, galleryNumber: newGallery })
	}

	const setPassword = (newPassword: string) => {
		setState({ ...state, password: newPassword })
	}

	const toClient = () => {
		router.push("/")
	}

	return (
		<form>
			<div className={classes.wrapper}>
				<div className={classes.selectorWrapper}>
					<div className={classes.selectorItem} onClick={toClient}>
						для клиента
					</div>
					<div className={classes.selectorItemActive}>
						для фотографа
					</div>
				</div>
				<h1>Вход в галерею</h1>
				<Input
					label={"E-mail:"}
					value={state.galleryNumber}
					update={setGallery}
					name="E_mail:"
				/>
				<Input
					label={"Пароль:"}
					value={state.password}
					update={setPassword}
					name="Password"
				/>
				<button type="submit" className={classes.btn}>
					Войти
				</button>
			</div>
		</form>
	)
}
