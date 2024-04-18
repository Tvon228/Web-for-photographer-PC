"use client"

import { useRouter } from "next/navigation"
import classes from "@/styles/page.module.sass"
import { useState } from "react"
import Input from "@/components/Input"
import { useEffect } from "react"

export default function Home() {
	const router = useRouter()

	useEffect(() => {
		if (!router) {
			console.error("Router is not available")
		}
	}, [router])

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

	const toPhotographer = () => {
		router.push("/Photographer")
	}

	return (
		<form>
			
			<div className={classes.wrapper}>
				<div className={classes.selectorWrapper}>
					<div className={classes.selectorItemActive}>
						для клиента
					</div>
					<div
						className={classes.selectorItem}
						onClick={toPhotographer}
					>
						для фотографа
					</div>
				</div>

				<h1>Вход в галерею</h1>
				<Input
					label={"Номер галереи:"}
					name="galary"
					value={state.galleryNumber}
					update={setGallery}
				/>
				<Input
					label={"Пароль галереи:"}
					name="password"
					value={state.password}
					update={setPassword}
				/>

				<button
					type="submit"
					className={classes.btn}
				>
					Войти
				</button>
			</div>
		</form>
	)
}
