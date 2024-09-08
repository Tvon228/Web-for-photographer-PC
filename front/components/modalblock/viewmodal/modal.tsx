import classes from "./modal.module.sass"
import { useRef, useState, useEffect } from "react"
import { useCreateGalleryMutation } from "@/src/api"
import SaveButton from "@/components/buttons/saveButton/saveButton"
import CloseButton from "@/components/buttons/closeButton/closeButton"
import useModal from "@/hooks/useModal.hook"
import toast from "react-hot-toast"

export default function AddGalleryModal() {
	const containerRef = useRef(null)
	const [createGallery] = useCreateGalleryMutation()
	const [state, setState] = useState({
		name: "",
		password: "",
		client_message: "",
		comment: "",
	})

	const [isOpened, _, closeModal] = useModal()

	// Функция для сброса состояния
	const resetState = () => {
		setState({
			name: "",
			password: "",
			client_message: "",
			comment: "",
		})
	}

	// Сброс состояния при открытии модалки
	useEffect(() => {
		if (isOpened) {
			resetState()
		}
	}, [isOpened])

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
			if (isOpened) {
				containerRef.current.style.removeProperty("z-index")
			} else {
				setTimeout(() => {
					containerRef.current.style.zIndex = "-1"
				}, 200)
			}
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
				<div className={classes.header}>
					<h1>Создание галереи</h1>
				</div>
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
								onChange={(e) =>
									setState({ ...state, name: e.target.value })
								}
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
								onChange={(e) =>
									setState({
										...state,
										password: e.target.value,
									})
								}
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
									setState({
										...state,
										client_message: e.target.value,
									})
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
								onChange={(e) =>
									setState({
										...state,
										comment: e.target.value,
									})
								}
							></textarea>
						</div>
					</div>
				</div>
				<div className={classes.buttons}>
					<SaveButton onClick={saveGalleryData} />
					<CloseButton onClick={closeModal} />
				</div>
			</div>
		</div>
	)
}
