import classes from "./photoPage.module.sass"

import { useCallback, useEffect, useRef, useState } from "react"
import { useUploadPhotoMutation } from "@/src/api"

import SaveButton from "@/components/buttons/saveButton/saveButton"
import CloseButton from "@/components/buttons/closeButton/closeButton"
import toast from "react-hot-toast"

import useFormModal from "@/hooks/FormModal/useFormModal.hook"

export default function PhotoPage({ galleryId }: {galleryId: number}) {
	const inputRef = useRef<HTMLInputElement>(null)

	const { opened, closeFormModalAction } = useFormModal()

	useEffect(() => {
		// @ts-ignore
		inputRef.current.value = null
	}, [opened])

	const closeModalAction = () => {
		setTimeout(() => {
			setSelectedPhotoList([])
		}, 200)
		closeFormModalAction()
	}

	const [uploadPhoto] = useUploadPhotoMutation()
	const [selectedPhotoList, setSelectedPhotoList] = useState<File[]>([])

	const startSelectPhotoAction = () => {
		// @ts-ignore
		inputRef.current.click()
	}
	
	const changePhotoInputAction = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSelectedPhotoList(Array.from(event.target.files as FileList))
		},
		[]
	)

	const uploadPhotoAction = async () => {
		try {
			for (let photo of selectedPhotoList) {
				await uploadPhoto({ galleryId, photo }).unwrap()
			}
			toast.success("Фото успешно загружены!")
		} catch (error) {
			toast.error("Ошибка при загрузке фото")
		}
	}

	const saveAction = async () => {
		if (selectedPhotoList.length > 0) {
			await uploadPhotoAction()
		}

		closeModalAction()
	}

	const removePhotoAction = (removingPhoto: File) => {
		const filteredPhotos = selectedPhotoList.filter(
			(photo) => photo.name !== removingPhoto.name
		)
		setSelectedPhotoList(filteredPhotos)
	}

	const isEmptyPhotoList = selectedPhotoList.length == 0
	
	return (
		<div className={classes.form}>
			<div className={classes.form_input}>
				<button
					className={classes.headerButton}
					onClick={startSelectPhotoAction}
				>
					Выбрать фотографии
				</button>

				<div className={classes.fileNamesContainer}>
					{renderSelectedPhoto(selectedPhotoList, removePhotoAction)}
				</div>
			</div>
			<input
				ref={inputRef}
				type="file"
				multiple
				style={{ display: "none" }}
				onChange={changePhotoInputAction}
			/>
			<div className={classes.buttons}>
				<SaveButton onClick={saveAction} disabled={isEmptyPhotoList} />
				<CloseButton onClick={closeModalAction} />
			</div>
		</div>
	)
}

function renderSelectedPhoto(photos: File[], removePhotoAction: (file: File) => void) {
	return photos.map((file) => (
		<div key={file.name} className={classes.fileNameItem}>
			<span>{file.name}</span>
			<button
				onClick={() => removePhotoAction(file)}
				className={classes.removeButton}
			>
				✖
			</button>
		</div>
	))
}