import classes from "./fileSide.module.sass"

export default function FileSide() {
	return (
		<div className={classes.form}>
			<div className={classes.form_input}>
				<button className={classes.headerButton}>Выбрать файлы</button>
				<div></div>
                <button className={classes.downloadButton}>Загрузить</button>
			</div>
		</div>
	)
}