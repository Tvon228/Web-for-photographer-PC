import classes from "@/styles/add.module.sass"

import CreateButton from "@/components/buttons/createButton/createButton"

export default function addGallary() {
	return (
		<div className={classes.container}>
			<div className={classes.header}>Создание галереи</div>
			<div className={classes.form}>
				<div className={classes.form_item}>
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
						<textarea rows="5" cols="30" />
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
						<textarea rows="5" cols="30"></textarea>
					</div>
				</div>
			</div>
			<CreateButton />
		</div>
	)
}
