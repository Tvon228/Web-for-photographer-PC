"use client"
import classes from "./add.module.sass"

import Image from "next/image"
import closeIcon from "@/public/icons/close.png"
import CreateButton from "@/components/buttons/createButton/createButton"
import useModal from "@/hooks/useModal.hook"
import { useEffect, useRef } from "react"

export default function AddGalleryModal() {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isOpened, _, closeModal] = useModal()

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
		<div ref={containerRef} className={classes.container + " " + (!isOpened && classes.containerHidden)}>
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
