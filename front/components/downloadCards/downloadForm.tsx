import classes from "./downloadForm.module.sass"
import PhotoCards from "./photoCards/photoCards"

export default function DownloadForm() {
	return (
		<div className={classes.container}>
			<label className={classes.download_label}>Загруженные файлы</label>
			<PhotoCards />
			<PhotoCards />
		</div>
	)
}
