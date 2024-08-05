import classes from "./modal.module.sass"

import { useRef, useState, useEffect } from "react"
import { useCreateGalleryMutation } from "@/src/api"

import Image from "next/image"
import closeIcon from "@/public/icons/close.png"
import SaveButton from "@/components/buttons/saveButton/saveButton"

import useModal from "@/hooks/useModal.hook"
import toast from "react-hot-toast"

export default function AddGalleryModal() {
	const containerRef = useRef<HTMLDivElement>(null)
	const [createGallery] = useCreateGalleryMutation()
	const [state, setState] = useState({
		name: "",
		password: "",
		client_message: "",
		comment: "",
	})

	const [isOpened, _, closeModal] = useModal()

	const setName = (newName: string) => setState({ ...state, name: newName })
	const setPassword = (newPassword: string) =>
		setState({ ...state, password: newPassword })
	const setClientMessage = (newClientMessage: string) =>
		setState({ ...state, client_message: newClientMessage })
	const setComment = (newComment: string) =>
		setState({ ...state, comment: newComment })

	const saveGalleryData = async () => {
		if (
			!state.name ||
			!state.password ||
			!state.client_message ||
			!state.comment
		) {
			toast.error("Пожалуйста, заполните все поля!")
			return
		}
		try {
			await createGallery(state).unwrap()
			toast.success("Галерея успешно создана!")
			closeModal()
		} catch (error) {
			toast.error("Ошибка при сохранении данных!")
		}
	}

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.style.zIndex = isOpened ? "1" : "-1"
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
				<Image
					src={closeIcon}
					alt="close"
					className={classes.controlIcon}
					onClick={closeModal}
				/>
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
							Комментарий для себя:
						</div>
						<div className={classes.form_textarea}>
							<textarea
								value={state.comment}
								onChange={(e) => setComment(e.target.value)}
							></textarea>
						</div>
					</div>
				</div>
				<SaveButton onClick={saveGalleryData} />
			</div>
		</div>
	)
}
