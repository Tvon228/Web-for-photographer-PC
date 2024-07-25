"use client"
import classes from "./modal.module.sass"

import Image from "next/image"
import closeIcon from "@/public/icons/close.png"
import SaveButton from "@/components/buttons/saveButton/saveButton"

import useModal from "@/hooks/useModal.hook"
import { useEffect, useRef, useState } from "react"
import { useCreateGalleryMutation } from "@/src/api"

export default function AddGalleryModal() {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isOpened, _, closeModal] = useModal()
	const [createGallery] = useCreateGalleryMutation()

	const [state, setState] = useState({
		name: "",
		password: "",
		client_message: "",
		comment: "",
	})

	const setName = (newName: string) => {
		setState({ ...state, name: newName })
	}

	const setPassword = (newPassword: string) => {
		setState({ ...state, password: newPassword })
	}

	const setClientMessage = (newClientMessage: string) => {
		setState({ ...state, client_message: newClientMessage })
	}

	const setComment = (newComment: string) => {
		setState({ ...state, comment: newComment })
	}

	const saveGalleryData = async () => {
		try {
			await createGallery({
				name: state.name,
				password: state.password,
				client_message: state.client_message,
				comment: state.comment,
			}).unwrap()
			closeModal()
		} catch (error) {
			console.error("Ошибка при сохранении данных:", error)
		}
	}

	useEffect(() => {
		if (isOpened) {
			containerRef.current.style.removeProperty("z-index")
		} else {
			setTimeout(() => {
				containerRef.current.style.zIndex = "-1"
			}, 300)
		}
	}, [isOpened])

	return (
		<div
			ref={containerRef}
			className={
				classes.container + " " + (!isOpened && classes.containerHidden)
			}
		>
			<div className={classes.content}>
				<div>
					<Image
						src={closeIcon}
						alt="close"
						className={classes.controlIcon}
						onClick={closeModal}
					/>
				</div>
				<div className={classes.header}>Создание галереи</div>
				<div className={classes.form}>
					<div className={classes.form_item}>
						<div className={classes.form_label}>
							Название галереи:
						</div>
						<div className={classes.form_input_container}>
							<input
								type="text"
								className={classes.form_input}
								name="name"
								value={state.name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className={classes.form_label}>
							Пароль к галереи:
						</div>
						<div className={classes.form_input_container}>
							<input
								type="text"
								className={classes.form_input}
								name="password"
								value={state.password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className={classes.form_item}>
						<div className={classes.form_label}>
							Сообщение для клиента:
						</div>
						<div className={classes.form_textarea}>
							<textarea
								value={state.client_message}
								onChange={(e) =>
									setClientMessage(e.target.value)
								}
							></textarea>
						</div>
					</div>
					<div className={classes.form_item}>
						<div className={classes.form_label}>
							<div>Комментарий для себя:</div>
							<div className={classes.comment}>
								(будет виден в личном кабинете)
							</div>
						</div>
						<div className={classes.form_textarea}>
							<textarea
								value={state.comment}
								onChange={(e) => setComment(e.target.value)}
							></textarea>
						</div>
					</div>
				</div>
				<SaveButton/>
			</div>
		</div>
	)
}
