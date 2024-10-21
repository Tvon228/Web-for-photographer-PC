import classes from "./photoSide.module.sass"

import { useCallback } from "react"

import { usePhoto } from "@/hooks/FormModal/usePhoto.hook"

export default function PhotoSide({ photos, setPhotoAction }: { photos: File[], setPhotoAction: (files: File[]) => void}) {
	const { selectedFiles, addPhoto, removePhoto } = usePhoto() // Обновлено на использование selectedFiles

	const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setPhotoAction(Array.from(event.target.files as FileList))
	}, [])

	const handleButtonClick = () => {
		const input = document.getElementById("file-input") as HTMLInputElement
		if (input) {
			input.click() // Имитируем клик по скрытому input
		}
	}

	return (
		<div className={classes.form}>
			<div className={classes.form_input}>
				<button
					className={classes.headerButton}
					onClick={handleButtonClick}
				>
					Выбрать файлы
				</button>

				<div className={classes.fileNamesContainer}>
					{photos.map((file) => (
						<div key={file.name} className={classes.fileNameItem}>
							<span>{file.name}</span>
							<button
								onClick={() => removePhoto(file)}
								className={classes.removeButton}
							>
								✖
							</button>
						</div>
					))}
				</div>
			</div>
			<input
				id="file-input"
				type="file"
				multiple
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
		</div>
	)
}
