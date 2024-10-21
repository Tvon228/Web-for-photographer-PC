import classes from "./photoSide.module.sass"

import { useCallback, useEffect, useRef } from "react"


interface PhotoSideProps { 
	photos: File[], 
	setPhotoAction: (files: File[]) => void,
	opened: boolean
}

export default function PhotoSide({ opened, photos, setPhotoAction }: PhotoSideProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	
	const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setPhotoAction(Array.from(event.target.files as FileList))
	}, [])

	const handleButtonClick = () => {
		// @ts-ignore
		inputRef.current.click()
	}

	const handleRemovePhoto = (removingPhoto: File) => {
		const filteredPhotos = photos.filter(photo => photo.name !== removingPhoto.name)
		setPhotoAction(filteredPhotos)
	}

	useEffect(() => {
		// @ts-ignore
		inputRef.current.value = null
	}, [opened])	

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
								onClick={() => handleRemovePhoto(file)}
								className={classes.removeButton}
							>
								✖
							</button>
						</div>
					))}
				</div>
			</div>
			<input
				ref={inputRef}
				type="file"
				multiple
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
		</div>
	)
}
