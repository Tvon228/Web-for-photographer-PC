import SaveButton from "@/components/buttons/saveButton/saveButton"
import classes from "./addphoto.module.sass"

import { useRef } from "react"

export default function AddPhoto() {
	const fileInputRef = useRef(null)

	const handleDrop = (e) => {
		e.preventDefault()
		const files = Array.from(e.dataTransfer.files)
		files.forEach((file) => console.log("Выбранный файл:", file))
	}

	const handleFileSelect = () => {
		const files = Array.from(fileInputRef.current.files)
		files.forEach((file) => console.log("Выбранный файл:", file))
	}

	return (
		<div className={classes.container}>
			<div className={classes.main}>
				<div
					className={classes.form_input}
					onDrop={handleDrop}
					onDragOver={(e) => e.preventDefault()}
					onClick={() => fileInputRef.current.click()}
				>
					<label>Нажмите или перетащите файлы:</label>
					<input
						type="file"
						style={{ display: "none" }}
						onChange={handleFileSelect}
						accept=".jpg, .jpeg, .png, .gif, .bmp, .svg, .raw, .cr2, .nef, .dng"
						ref={fileInputRef}
						multiple
					/>
				</div>
			</div>
		</div>
	)
}
