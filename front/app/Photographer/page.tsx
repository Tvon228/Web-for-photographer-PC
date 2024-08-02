"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Input from "@/components/Input"
import classes from "@/styles/page.module.sass"

export default function Photographer() {
	const router = useRouter()
	const [state, setState] = useState({
		email: "",
		password: "",
	})

	const setEmail = (newEmail: string) => {
		setState({ ...state, email: newEmail })
	}

	const setPassword = (newPassword: string) => {
		setState({ ...state, password: newPassword })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const response = await fetch("http://localhost:8000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(state),
		})

		if (response.ok) {
			const { token } = await response.json()
			if (token) {
				// Устанавливаем куку
				document.cookie = `jwt=${token}; path=/; SameSite=Lax`
				router.push("/gallery")
			} else {
				alert("Login failed")
			}
		} else {
			alert("Login failed")
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={classes.wrapper}>
				<div className={classes.selectorWrapper}>
					<div
						className={classes.selectorItem}
						onClick={() => router.push("/")}
					>
						для клиента
					</div>
					<div className={classes.selectorItemActive}>
						для фотографа
					</div>
				</div>
				<h1>Вход для фотографа</h1>
				<Input
					label={"E-mail:"}
					value={state.email}
					update={setEmail}
					name="email"
				/>
				<Input
					label={"Пароль:"}
					value={state.password}
					update={setPassword}
					name="password"
				/>
				<button type="submit" className={classes.btn}>
					Войти
				</button>
			</div>
		</form>
	)
}
